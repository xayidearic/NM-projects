const handleSectionScroll = (section) => {
    const targetSection = document.getElementById(section);

    if (targetSection) {
        const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
            top: targetPosition - 90,
            behaviour: 'smooth'
        });
    }
}

export default handleSectionScroll;