{/* Store videos and images in public folder */}

{/* Data to be passed to scroller components */}
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