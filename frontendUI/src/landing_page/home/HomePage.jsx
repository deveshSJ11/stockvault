import React, { useEffect, useRef, useCallback } from "react";
import Hero from "./Hero";
import Awards from "./Awards";
import Stats from "./Stats";
import Pricing from "./Pricing";
import Education from "./Education";
import OpenAccount from "../OpenAccount";
import Navbar from "../Navbar";
import Footer from "../Footer";

function HomePage() {
  const observerRef = useRef(null);
  const tickingRef = useRef(false);
  const navbarRef = useRef(null);

  // Optimized scroll handler with RAF throttling
  const handleScroll = useCallback(() => {
    if (!tickingRef.current) {
      window.requestAnimationFrame(() => {
        const navbar = navbarRef.current || document.querySelector('.navbar');
        if (navbar) {
          navbar.classList.toggle('navbar-scrolled', window.scrollY > 50);
        }
        tickingRef.current = false;
      });
      tickingRef.current = true;
    }
  }, []);

  useEffect(() => {
    // Store navbar reference
    navbarRef.current = document.querySelector('.navbar');

    // Optimized Intersection Observer with performance settings
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Use RAF for smoother animation triggering
            requestAnimationFrame(() => {
              entry.target.classList.add('animate-in');
            });
            // Unobserve after animation to reduce observer workload
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach((el) => observerRef.current?.observe(el));

    // Passive scroll listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <Navbar />
      <Hero />
      <Awards />
      <Stats />
      <Pricing />
      <Education />
      <OpenAccount />
    </>
  );
}

export default HomePage;