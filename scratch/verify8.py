from PIL import Image

img = Image.open("/Users/yanxianliang/overseas/pen-antd-kit/scratch/export8/xzrga.png").convert("RGB")
S = 2
W, H = img.size
px = img.load()
print("image", W, H)

def sample(x, y):
    return px[int(round(x * S)), int(round(y * S))]

def hexs(c):
    return "#%02X%02X%02X" % c

# geometry (unscaled, relative to xzrga)
OX, OY = 1 + 24, 1 + 42
X0, X1 = OX, OX + 774
rows = {"r1": (OY + 0, 32), "r2": (OY + 40, 32), "r3": (OY + 80, 32),
        "r4": (OY + 120, 32), "r5": (OY + 160, 40), "r6": (OY + 208, 40)}
for k, (y, h) in rows.items():
    print(k, "y", y, "..", y + h)

# --- A. row3 compact junction ---
ry, rh = rows["r3"]
ymid = ry + rh / 2
print("\n[A] row3 junction scan @y=%d" % ymid)
out = []
for x in range(92, 108):
    out.append("%d:%s" % (x, hexs(sample(x, ymid))))
print("   ", " ".join(out))
# top edge of addon (no text) for bg color
print("[A2] addon bg @ (90,%d) = %s   input bg @ (110,%d) = %s" % (
    ry + 4, hexs(sample(90, ry + 4)), ry + 4, hexs(sample(110, ry + 4))))
print("[A3] addon top/bottom border @ (60,%d)=%s (60,%d)=%s" % (
    ry, hexs(sample(60, ry)), ry + rh - 1, hexs(sample(60, ry + rh - 1))))
print("[A4] input top border @ (400,%d)=%s" % (ry, hexs(sample(400, ry))))

# --- B/C. large enterButton rows: locate blue button, measure text bbox ---
def is_blue(c):
    r, g, b = c
    return b > 150 and b - r > 60 and g > 80 and g < 200

def is_whiteish(c):
    r, g, b = c
    return r > 200 and g > 200 and b > 200

for k in ("r5", "r6"):
    ry, rh = rows[k]
    ymid = ry + rh / 2
    xs = [x for x in range(X1 - 92, X1) if is_blue(sample(x, ymid))]
    bx0, bx1 = min(xs), max(xs)
    # text bbox: bright ink strictly inside the contiguous blue button run
    tx0, tx1 = None, None
    for x in range(bx0 + 1, bx1):
        col_has = any(is_whiteish(sample(x, y)) for y in range(ry + 6, ry + rh - 6))
        if col_has:
            tx0 = x if tx0 is None else tx0
            tx1 = x
    print("\n[%s] button x=%d..%d (w=%d)  y=%d h=%d" % (k, bx0, bx1, bx1 - bx0 + 1, ry, rh))
    if tx0 is not None:
        lg, rg = tx0 - bx0, bx1 - tx1
        print("     text x=%d..%d (w=%d)  leftgap=%d rightgap=%d  %s" % (
            tx0, tx1, tx1 - tx0 + 1, lg, rg, "CENTERED" if abs(lg - rg) <= 1 else "OFF-CENTER"))
    else:
        print("     no light text pixels found inside button")

# --- D. row3 addon text horizontal padding ---
ry, rh = rows["r3"]
dark_x = [x for x in range(X0, X0 + 76)
          if any(sample(x, y)[0] < 120 and sample(x, y)[1] < 120 for y in range(ry + 6, ry + rh - 6))]
if dark_x:
    print("\n[D] row3 addon text x=%d..%d ; addon spans %d..%d ; leftpad=%d rightpad=%d" % (
        min(dark_x), max(dark_x), X0, X0 + 75, min(dark_x) - X0, X0 + 75 - max(dark_x)))
