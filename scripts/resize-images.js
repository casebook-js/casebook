#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const fastGlob = require('fast-glob');
const sizeOf = require('image-size');
const sharp = require('sharp');

setTimeout(async () => {
    const profileImagesDirectoryPath = path.join(__dirname, '..', 'data', 'images', 'profile-images');
    const arrFiles = fastGlob.sync(
        [
            '**/*.{jpeg,jpg,png}',
            '!**/*.resized-*.*'
        ],
        {
            cwd: profileImagesDirectoryPath
        }
    );

    for (let i = 0; i < arrFiles.length; i++) {
        const sizes = [
            { width: 40, height: 40 },
            { width: 80, height: 80 },
            { width: 120, height: 120 }
        ];
        for (let j = 0; j < sizes.length; j++) {
            const size = sizes[j];

            const inputFile = arrFiles[i];
            const inputPath = path.resolve(profileImagesDirectoryPath, inputFile);

            let outputFileBasename = path.basename(inputPath);
            outputFileBasename = outputFileBasename.split('.');
            outputFileBasename.splice(outputFileBasename.length - 1, 0, `resized-${size.width}x${size.height}`);
            outputFileBasename = outputFileBasename.join('.');

            const outputFile = path.join(
                path.dirname(inputFile),
                outputFileBasename
            );
            const outputPath = path.resolve(profileImagesDirectoryPath, outputFile);

            if (!fs.existsSync(outputPath)) {
                const inputBuffer = fs.readFileSync(inputPath);

                const outputBuffer = await (
                    sharp(inputBuffer)
                        .resize(size.width, size.height)
                        .toBuffer()
                );

                fs.writeFileSync(outputPath, outputBuffer);
                console.log(`Generated ${outputPath}`);
            }
        }
    }
});

setTimeout(async () => {
    const postImagesDirectoryPath = path.join(__dirname, '..', 'data', 'images', 'posts');
    const arrFiles = fastGlob.sync(
        [
            '**/*.{jpeg,jpg,png}',
            '!**/*.resized-*.*'
        ],
        {
            cwd: postImagesDirectoryPath
        }
    );

    for (let i = 0; i < arrFiles.length; i++) {
        const requiredSizes = [
            { width: 350 },
            { width: 700 },
            { width: 1050 },
            { width: 1400 },
            { width: 2100 },
            { width: 3150 }
        ];

        const inputFile = arrFiles[i];
        const inputPath = path.resolve(postImagesDirectoryPath, inputFile);
        const imageDimensions = sizeOf(inputPath);
        const imageHeight = imageDimensions.height;
        const imageWidth = imageDimensions.width;

        for (let j = 0; j < requiredSizes.length; j++) {
            const requiredSize = requiredSizes[j];

            if (requiredSize.width < imageWidth) {
                requiredSize.height = Math.round((requiredSize.width * imageHeight) / imageWidth, 10);

                let outputFileBasename = path.basename(inputPath);
                outputFileBasename = outputFileBasename.split('.');
                outputFileBasename.splice(outputFileBasename.length - 1, 0, `resized-${requiredSize.width}x${requiredSize.height}`);
                outputFileBasename = outputFileBasename.join('.');

                const outputFile = path.join(
                    path.dirname(inputFile),
                    outputFileBasename
                );
                const outputPath = path.resolve(postImagesDirectoryPath, outputFile);

                if (!fs.existsSync(outputPath)) {
                    const inputBuffer = fs.readFileSync(inputPath);

                    const outputBuffer = await (
                        sharp(inputBuffer)
                            .resize(requiredSize.width, requiredSize.height)
                            .toBuffer()
                    );

                    fs.writeFileSync(outputPath, outputBuffer);
                    console.log(`Generated ${outputPath}`);
                }
            }
        }
    }
});
