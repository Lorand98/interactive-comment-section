module.exports = {
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
            @use "src/sass/base/*";
            @use "src/sass/absracts/*";
          `,
      },
    },
  },
};
