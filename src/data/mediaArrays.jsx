{/* Store videos and images in public folder */}

export  const sampleMediaArray = [
    {
        type: 'image',
        src: '/images/subdirectory/image.jpg',
        alt: 'Alt text for image',
        username: 'Username of poster',
        caption: 'Image caption'
    },
    {
        type: 'video',
        src: '/videos/subdirectory/video.mp4',
        username: 'Username of poster',
        caption: 'Video caption',
        audio: true
    }
];