function init() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
init();

var cursor = document.querySelector(".cursor");
var main = document.querySelector(".main");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.x + 5 + "px";
  cursor.style.top = e.y + 5 + "px";
});

var tl1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    // marker: true,
    scroller: ".main",
    start: "top 27%",
    end: "top 0%",
    scrub: 5,
  },
});

tl1.to(
  ".page1 h1",
  {
    x: -140,
  },
  "anim"
);

tl1.to(
  ".page1 h2",
  {
    x: 150,
  },
  "anim"
);

tl1.to(
  ".page1 img",
  {
    width: "48%",
  },
  "anim"
);

var tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page2 h1",
    // markers: true,
    scroller: ".main",
    start: "top 80%",
    end: "top 60%",
    scrub: 5,
  },
});

tl2.to(
  ".main",
  {
    // backgroundColor: "#fff",
    // backgroundColor: "#FDF5E6"
    // backgroundColor: "#EDEAE0"
    backgroundColor: "#edd8e9"
  },
  "anim"
);

var t112 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page2 h1",
    scroller: ".main",
    // markers:true,
    start: "top 80%",
    end: "top 60%",
    scrub: 5,
  },
});

t112.to(
  ".page2 h1",
  {
    x: 740,
    scrub: 2,
  },
  "anim"
);
t112.to(
  ".page2 p",
  {
    x: -234,
    scrub: 2,
  },
  "anim"
);

var tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page3",
    // markers:true,
    scroller: ".main",
    start: "top 70%",
    // start: "top -190%",
    end: "top 20%",
    scrub: 5,
  },
});

tl3.to(".main", {
  backgroundColor: "#000",
});
