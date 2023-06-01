const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '4523fb844dd8009eeb01d6811c933bf8',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;