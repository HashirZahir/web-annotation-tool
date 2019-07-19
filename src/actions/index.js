export const addBox = (id, position) => {
  return {
    type: "ADD_BOX",
    id: id,
    position
  }
}

export const deleteBox = (id) => {
  return {
    type: "DELETE_BOX",
    id: id
  }
}

/**
 * Update position of an existing box.
 * @param {int} id 
 * @param {Object} position 
 */
export const updateBox = (id, label) => {
  return {
    type: "UPDATE_BOX",
    id: id,
    label
  }
}


export const setImageProps = (height, width, offsetX, offsetY) => {
  return {
    type: "SET_IMAGE_PROPS",
    height,
    width,
    offsetX,
    offsetY
  }
}