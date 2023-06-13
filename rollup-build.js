export default {
    output: {
        //解决打包时Some chunks are larger警告
        manualChunks(id) {
            if (id.includes('node_modules')) {
                return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
        },
        chunkFileNames: 'admin/js/[name]-[hash].js',
        entryFileNames: 'admin/js/[name]-[hash].js',
        assetFileNames: 'admin/[ext]/[name]-[hash].[ext]',
    }
}