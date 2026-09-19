"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IPCElectron = void 0;
const shared_1 = require("@ha/shared");
const electron_1 = require("electron");
const logger_1 = require("./logger");
class IPCElectron extends shared_1.IPCHost {
    constructor(webContents) {
        const onMessage = (callback) => {
            const listener = (event, message) => {
                if (event.sender.id === webContents.id) {
                    callback(message);
                }
            };
            electron_1.ipcMain.on("ipc-message", listener);
            return () => {
                electron_1.ipcMain.off("ipc-message", listener);
            };
        };
        const sendMessage = (message) => {
            if (!webContents.isDestroyed() && !webContents.isCrashed()) {
                webContents.send("ipc-message", message);
                return shared_1.IPCSendResult.Sent;
            }
            return shared_1.IPCSendResult.Unreachable;
        };
        super(onMessage, sendMessage, logger_1.logger);
        const failPendingRequests = () => {
            this.rejectPendingRequests(shared_1.IPCDisconnectReason.ConnectionLost);
        };
        webContents.on("render-process-gone", failPendingRequests);
        webContents.on("did-navigate", failPendingRequests);
        this.removeWebContentsListeners = () => {
            if (!webContents.isDestroyed()) {
                webContents.off("render-process-gone", failPendingRequests);
                webContents.off("did-navigate", failPendingRequests);
            }
        };
    }
    dispose() {
        this.removeWebContentsListeners();
        super.dispose();
    }
}
exports.IPCElectron = IPCElectron;
