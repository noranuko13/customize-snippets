export const animate = (elements: Element[]) => {
  elements.forEach((element) => {
    element.animate(
      {
        background: ["#b3d9ff", "#7fbfff", "#b3d9ff"],
        easing: "ease-out",
      },
      {
        fill: "forwards",
        duration: 400,
      },
    );
  });
};
