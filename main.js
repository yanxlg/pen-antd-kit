"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const node_url_1 = require("node:url");
const Sentry = __importStar(require("@sentry/electron/main"));
const electron_1 = require("electron");
const app_1 = require("./app");
const constants_1 = require("./constants");
const logger_1 = require("./logger");
const previews_1 = require("./previews");
const quit_state_1 = require("./quit-state");
const updater_1 = require("./updater");
Sentry.init({
    dsn: "https://1f085c3019b029471bf9e444f4734eb5@o4510271844122624.ingest.us.sentry.io/4510753382400000",
    // Include the package version as the release version
    release: electron_1.app.getVersion(),
    // Intentionally sending PIIs like IP addresses, user IDs for now.
    sendDefaultPii: true,
    // Disable Sentry in development environment
    enabled: !constants_1.IS_DEV,
    beforeSend(event) {
        if (!event.contexts) {
            event.contexts = {};
        }
        if (!event.contexts.device) {
            event.contexts.device = {};
        }
        event.contexts.device["Is Online"] = electron_1.net.isOnline();
        return event;
    },
});
let initArgs;
let penApp;
const gotTheLock = electron_1.app.requestSingleInstanceLock();
if (!gotTheLock) {
    electron_1.app.quit();
}
else {
    electron_1.app.on("second-instance", (_event, commandLine, _workingDirectory) => {
        logger_1.logger.info("[app] second-instance", commandLine.join(" "));
        // Someone tried to run another instance, focus our window instead
        const focusedWindow = penApp === null || penApp === void 0 ? void 0 : penApp.getFocusedWindow();
        if (focusedWindow) {
            if (focusedWindow.isMinimized())
                focusedWindow.restore();
            focusedWindow.focus();
        }
        const args = commandLine.slice(electron_1.app.isPackaged ? 1 : 2);
        const fileArg = args.find((arg) => arg.endsWith(".pen"));
        if (fileArg && penApp) {
            const resolvedPath = resolveFilePath(fileArg);
            if (fs.existsSync(resolvedPath)) {
                penApp.loadFile((0, node_url_1.pathToFileURL)(resolvedPath).href, true);
            }
        }
    });
}
// Register custom protocol for serving editor files
electron_1.protocol.registerSchemesAsPrivileged([
    {
        scheme: constants_1.APP_PROTOCOL,
        privileges: {
            standard: true,
            secure: true,
            supportFetchAPI: true,
            corsEnabled: true,
        },
    },
]);
electron_1.app.whenReady().then(async () => {
    logger_1.logger.info(`[app] ready - IS_DEV: ${constants_1.IS_DEV}, NODE_ENV: ${process.env.NODE_ENV}`);
    // Check for app launched from dmg on MacOS.
    if (!constants_1.IS_DEV && constants_1.IS_MAC && isRunningFromDmg()) {
        electron_1.dialog.showMessageBoxSync({
            type: "error",
            buttons: ["OK"],
            message: `Please install app before launching`,
        });
        electron_1.app.quit();
        return;
    }
    electron_1.protocol.handle(constants_1.APP_PROTOCOL, (request) => {
        try {
            const url = new URL(request.url);
            // NOTE(sedivy): Serve document thumbnail images from the previews folder.
            if (url.host === previews_1.PREVIEW_URL_HOST) {
                const previewPath = (0, previews_1.getPreviewPathForRequest)(url.pathname);
                if (!previewPath) {
                    return new Response(undefined, { status: 404 });
                }
                return electron_1.net.fetch((0, node_url_1.pathToFileURL)(previewPath).toString());
            }
            if (constants_1.IS_DEV || url.host !== "editor") {
                return new Response(undefined, { status: 404 });
            }
            let fileName = decodeURIComponent(url.pathname);
            if (fileName === "/") {
                fileName = "/index.html";
            }
            const editorFolder = path.join(__dirname, "editor");
            const filePath = path.join(editorFolder, fileName);
            const relativePath = path.relative(editorFolder, filePath);
            if (relativePath === "" ||
                relativePath.startsWith("..") ||
                path.isAbsolute(relativePath)) {
                return new Response(undefined, { status: 404 });
            }
            return electron_1.net.fetch((0, node_url_1.pathToFileURL)(filePath).href);
        }
        catch (error) {
            logger_1.logger.error("Protocol handler error:", error);
            throw error;
        }
    });
    penApp = new app_1.PenApp();
    await penApp.initialize(initArgs);
});
electron_1.app.on("window-all-closed", () => {
    logger_1.logger.info("[app] window-all-closed");
    if (!constants_1.IS_MAC || (0, quit_state_1.isQuitting)()) {
        electron_1.app.quit();
    }
});
electron_1.app.on("will-quit", (event) => {
    logger_1.logger.info("[app] will-quit");
    (0, updater_1.installUpdateIfPending)(() => {
        event.preventDefault();
        (0, quit_state_1.cancelQuit)();
    });
});
electron_1.app.on("before-quit", (event) => {
    logger_1.logger.info("[app] before-quit");
    if (penApp != null && !penApp.requestQuit()) {
        event.preventDefault();
    }
});
electron_1.app.on("quit", (_event, exitCode) => {
    logger_1.logger.info(`[app] quit (exitCode=${exitCode})`);
});
electron_1.app.on("activate", async () => {
    const windowCount = electron_1.BrowserWindow.getAllWindows().length;
    logger_1.logger.info(`[app] activate (openWindows=${windowCount})`);
    // NOTE(sedivy): Show the dashboard when the dock icon is clicked and no windows are open.
    if (penApp && windowCount === 0 && !(0, quit_state_1.isQuitting)()) {
        penApp.showDashboard();
    }
});
electron_1.app.on("open-file", async (event, filePath) => {
    logger_1.logger.info(`[app] open-file: ${filePath}`);
    event.preventDefault();
    if (path.extname(filePath) !== ".pen") {
        return;
    }
    if ((0, quit_state_1.isQuitting)()) {
        return;
    }
    if (penApp) {
        // App is already running, open the file directly
        penApp.loadFile((0, node_url_1.pathToFileURL)(filePath).href, true);
    }
    else {
        // App is starting, store the file to open after initialization
        initArgs = { filePath };
    }
});
function resolveFilePath(filePath) {
    if (path.isAbsolute(filePath)) {
        return filePath;
    }
    return path.resolve(process.cwd(), filePath);
}
function isRunningFromDmg() {
    const appPath = electron_1.app.getAppPath();
    if (!appPath.startsWith("/Volumes/"))
        return false;
    // Shouldn't happen just not to give false positives in respective catch.
    if (!appPath.includes(".app"))
        return false;
    const pathToCheck = path.join(appPath.split(".app")[0], ".app");
    try {
        fs.accessSync(pathToCheck, fs.constants.W_OK);
        return false;
    }
    catch (_a) {
        return true;
    }
}
