import { useRef, useEffect } from 'react';

const Scroller = ({ media = [] }) => {
    const containerRef = useRef(null);
    useEffect(() => {
        if (!containerRef.current) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const video = entry.target.querySelector('video');
                if (!video) return;
                
                if (entry.isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }, {
            root: containerRef.current,
            threshold: 0.7  // Consider visible when 70% in view
        });
        
        const items = containerRef.current.querySelectorAll('.snap-item');
        items.forEach(item => observer.observe(item));  

        return () => {
            items.forEach(item => observer.unobserve(item));
            observer.disconnect();
        };
    }, [media]);
    
    return (
        <div className="relative w-full h-full flex justify-center items-center">
            <div className="relative bg-black rounded-3xl w-[375px] h-[812px] overflow-hidden shadow-xl" style={{aspectRatio: '9 / 19.5', maxHeight: '80vh'}}>
                <div className="absolute top-0 left-0 right-0 h-8 bg-black z-20 flex justify-center">
                    <div className="w-40 h-8 bg-black rounded-b-2xl"></div>
                </div>
                <div
                    ref={containerRef}
                    className="h-full w-full overflow-y-auto scrollbar-hide snap-y snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {media.map((item, index) => (
                        <div 
                            key={index}
                            className="snap-item w-full h-full snap-start flex items-center justify-center relative"
                        >
                            {item.type === 'video' ? (
                                <video
                                    src={item.src}
                                    className="w-full h-full object-cover"
                                    loop
                                    muted={!item.audio}
                                    playsInline
                                    controls={false}
                                    draggable={false}
                                />
                            ) : (
                                <img
                                    src={item.src}
                                    alt={item.alt || `Media ${index}`}
                                    className="w-full h-full object-cover"
                                    draggable={false}
                                />
                            )}
                            <div className="absolute bottom-4 left-2 right-2 text-white z-10 p-2">       
                                <p className="font-bold text-lg">{item.username || 'user'}</p>
                                <p className="text-sm mt-1">{item.caption || 'Caption goes here...'}</p>
                            </div>
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    );
};


export default Scroller;