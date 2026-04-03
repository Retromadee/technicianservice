/* Storage Service — Stub */
const StorageService = (() => {
    async function uploadImage(file) {
        await new Promise(r => setTimeout(r, 500));
        return URL.createObjectURL(file);
    }
    return { uploadImage };
})();
