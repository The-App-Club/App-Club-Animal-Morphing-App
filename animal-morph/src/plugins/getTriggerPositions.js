function isMobile() {
  const html = document.documentElement;
  return html.classList.contains('isMobile');
}

function getTriggerPositions() {
  if (isMobile()) {
    return {
      start: 'top bottom',
      end: 'center center',
    };
  } else {
    return {
      start: 'top center',
      end: 'center center',
    };
  }
}

export {getTriggerPositions};
