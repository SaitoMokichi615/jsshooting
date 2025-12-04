// core/AssetLoader.js
export class AssetLoader {
    constructor() {
        this.images = {};
    }

    loadImages(assetList) {
        const promises = assetList.map(asset => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = asset.path;
                img.onload = () => {
                this.images[asset.name] = img;
                resolve();
                };
                img.onerror = reject;
            });
        });

        return Promise.all(promises);
    }

    getImage(name) {
        return this.images[name];
    }
}
