export const getOffsetX = (elem) => {
  const { body, documentElement: doc } = document;
  const { left } = elem.getBoundingClientRect();
  const { pageXOffset } = window;
  const offsetX = left + (pageXOffset || doc.scrollLeft) - (doc.clientLeft || body.clientLeft || 0);

  return offsetX;
};

/**
 * Get X axis coords of event
 * relative to the element
 *
 * @param {MouseEvent|TouchEvent} e
 * @param {HTMLDivElement} elem - element relative to which coordinate X is calculated
 *
 * @returns {number} - X axis value
 */
export const getEventOffsetXRelativeToElem = (e, elem) => {
  const event = e.targetTouches ? e.targetTouches[0] : e;
  const elemOffsetX = getOffsetX(elem);
  const eventOffsetXFromElem = event.pageX - elemOffsetX;

  return eventOffsetXFromElem;
};
