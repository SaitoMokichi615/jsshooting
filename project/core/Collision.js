export function circleHit(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return dx * dx + dy * dy < (a.r + b.r) ** 2;
}

export function rectHit(a, b) {
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

export function circleRectHit(circle, rect) {
    const cx = Math.max(rect.x, Math.min(circle.x, rect.x + rect.w));
    const cy = Math.max(rect.y, Math.min(circle.y, rect.y + rect.h));
    const dx = circle.x - cx;
    const dy = circle.y - cy;
    return dx * dx + dy * dy < circle.r * circle.r;
}

export function rectCircleCollision(rx, ry, rw, rh, rAngle, cx, cy, cr) {
    // ① 円を矩形のローカル座標へ変換（逆回転）
    const dx = cx - rx;
    const dy = cy - ry;

    const rotatedX = dx * Math.cos(-rAngle) - dy * Math.sin(-rAngle);
    const rotatedY = dx * Math.sin(-rAngle) + dy * Math.cos(-rAngle);

    // ② もっとも近い矩形の点を求める
    const nearestX = Math.max(0, Math.min(rw, rotatedX));
    const nearestY = Math.max(-rh/2, Math.min(rh/2, rotatedY));

    // ③ 距離計算
    const distX = rotatedX - nearestX;
    const distY = rotatedY - nearestY;

    return distX * distX + distY * distY < cr * cr;
}

