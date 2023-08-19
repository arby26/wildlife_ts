interface WLVector {
  x: number;
  y: number;
  z: number;
} 

class Vector {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static fromWLVector(vector: WLVector) {
    return new Vector(vector.x, vector.y, vector.z);
  }
}

class SandboxObject {
  #object: WLSandboxObject;
  #name: string;

  constructor(name: string) {
    this.#object = wl_get_object(name);
    this.#name = name;
  }

// wl_get_object_below (objectName, sandboxObject)
// wl_set_object_position (sandboxObject, x, y, z)
// wl_set_object_position (sandboxObject, vector)
// wl_set_object_rotation (sandboxObject, x, y, z)
// wl_set_object_rotation (sandboxObject, vector)
// wl_set_object_scale (sandboxObject, x, y, z)
// wl_set_object_scale (sandboxObject, vector)
// wl_set_object_local_position (sandboxObject, x, y, z)
// wl_set_object_local_position (sandboxObject, vector)
// wl_set_object_local_rotation (sandboxObject, x, y, z)
// wl_set_object_local_rotation (sandboxObject, vector)
// wl_set_object_local_scale (sandboxObject, x, y, z)
// wl_set_object_local_scale (sandboxObject, vector)
// wl_dispatch_event_to_object (eventName, eventValue, sandboxObject)
// wl_get_object_float_option (sandboxObject, optionName)
// wl_get_object_integer_option (sandboxObject, optionName)
// wl_get_object_string_option (sandboxObject, optionName)
// wl_get_object_bool_option (sandboxObject, optionName)
// wl_get_object_vector_option (sandboxObject, optionName)
// wl_get_object_color_option (sandboxObject, optionName)
// wl_set_object_float_option (sandboxObject, optionName, optionValue)
// wl_set_object_integer_option (sandboxObject, optionName, optionValue)
// wl_set_object_string_option (sandboxObject, optionName, optionValue)
// wl_set_object_bool_option (sandboxObject, optionName, optionValue)
// wl_set_object_vector_option (sandboxObject, optionName, optionValue)
// wl_set_object_color_option (sandboxObject, optionName, optionValue)
// wl_add_event_to_dispatcher (sandboxObject, dispatcherID, eventName, eventValue)
// wl_remove_event_from_dispatcher (sandboxObject, dispatcherID, eventName)
// wl_add_event_to_receiver (sandboxObject, dispatcherID, eventName, eventValue)
// wl_remove_event_from_receiver (sandboxObject, dispatcherID, eventName)
// wl_set_object_visibility (sandboxObject, newVisibility)
// wl_get_object_dispatchers_enabled (sandboxObject)
// wl_set_object_dispatchers_enabled (sandboxObject, newEnabled)
// wl_set_object_receivers_enabled (sandboxObject, newEnabled)
// wl_get_object_name (sandboxObject)

// getters.
  get objectForwardVector () {
    return Vector.fromWLVector(wl_get_object_forward_vector(this.#object));
  }
  get objectRightVector () {
    return Vector.fromWLVector(wl_get_object_right_vector(this.#object));
  }
  get objectUpVector () {
    return Vector.fromWLVector(wl_get_object_up_vector(this.#object));
  }
  get objectBackVector () {
    return Vector.fromWLVector(wl_get_object_back_vector(this.#object));
  }
  get objectLeftVector () {
    return Vector.fromWLVector(wl_get_object_left_vector(this.#object));
  }
  get objectDownVector () {
    return Vector.fromWLVector(wl_get_object_down_vector(this.#object));
  }
  get objectParent () {
    return wl_get_object_parent(this.#object);
  }
  get objectChildren () {
    return wl_get_object_children(this.#object);
  }
  get objectChildrenRecursive () {
    return wl_get_object_children_recursive(this.#object);
  }
  get objectVisibility () {
    return wl_get_object_visibility(this.#object);
  }
  get objectReceiversEnabled () {
    return wl_get_object_receivers_enabled(this.#object);
  }
}
