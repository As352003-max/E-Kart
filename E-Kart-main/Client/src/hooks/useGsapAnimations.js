import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useGsapAnimations = () => {
  useEffect(() => {
    gsap.from(".product-card", {
      opacity: 0,
      y: 50,
      scale: 0.9,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".product-card",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(".product-heading", {
      opacity: 0,
      y: -30,
      duration: 1,
      ease: "power2.out",
    });
  }, []);
};

export default useGsapAnimations;
