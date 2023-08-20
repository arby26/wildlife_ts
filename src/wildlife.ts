class Vector {
  #wlVector: WLVector;

  constructor(...args: [x: number, y: number, z: number] | [vector: WLVector]) {
    if(typeof args[0] === 'object') {
      this.#wlVector = args[0];
    } else {
      this.#wlVector = wl_make_vector(
        args[0],
        args[1] as number,
        args[2] as number
      );
    }
  }

  get x(): number {
    return this.#wlVector.x;
  }

  get y(): number {
    return this.#wlVector.y;
  }

  get z(): number {
    return this.#wlVector.z;
  }

  #ensureWLVector(vector: WLVector | Vector): WLVector {
    if(vector instanceof Vector) {
      return vector.#wlVector;
    }

    return vector;
  }

  #ensureWLVectorOrNumber(vectorOrNumber: WLVector | Vector | number): WLVector | number {
    if(typeof vectorOrNumber === 'number') {
      return vectorOrNumber;
    }
    return this.#ensureWLVector(vectorOrNumber);
  }

  get wlVector(): WLVector {
    return #wlVector;
  }

  toString(): WLVectorString {
    return wl_make_vector_string(this.#wlVector);
  }

  add(b: WLVector | Vector | number): Vector {
    wl_vector_add(this.#wlVector, b);
  };

  subtract(vectorB: WLVector | Vector | number): Vector {
    wl_vector_subtract(vectorA, vectorB);
  };

  multiply(vectorB: WLVector | Vector | number): Vector {
    wl_vector_multiply(vectorA, vectorB);
  };

  divide(vectorB: WLVector | Vector | number): Vector {
    wl_vector_divide(vectorA, vectorB);
  };

  normalize(): Vector {
    wl_vector_normalize(vector);
  };

  dot(vectorB: WLVector | Vector): number {
    wl_vector_dot(vectorA, vectorB);
  };

  cross(vectorB: WLVector | Vector): Vector {
    wl_vector_cross(vectorA, vectorB);
  };

  reflect(vectorB: WLVector | Vector): Vector {
    wl_vector_reflect(vectorA, vectorB);
  };

  length(vector: WLVector | Vector): number {
    wl_vector_length(vector);
  };

  project(vectorB: WLVector | Vector): Vector {
    wl_vector_project(vectorA, vectorB);
  };

  plane_project(vectorB: WLVector | Vector): Vector {
    wl_vector_plane_project(vectorA, vectorB);
  };

  print(): void {
    wl_print_vector(this.#wlVector);
  };
}

/**
 * A wrapper for WLSandboxObject.
 * 
 * Implements all lua functions for interacting with sandbox objects as methods, getters and setters.
 */
class SandboxObject {
  #object: WLSandboxObject;
  #name: string;

  constructor(nameOrObject: string | WLSandboxObject) {
    if(typeof nameOrObject === 'string') {
      this.#object = wl_get_object(nameOrObject);
      this.#name = nameOrObject;
    } else {
      this.#object = nameOrObject;
      this.#name = wl_get_object_name(nameOrObject);
    }
  }

  get_object_below(objectName: string, sandboxObject: WLSandboxObject) {
    return get_object_below(objectName, #object);
  }
  set_object_position(sandboxObject: WLSandboxObject, ...args: [x: number, y: number, z: number] | [vector: WLVector | Vector]) {
    if(typeof args[0] === 'number') {

    } else if(args[0] instanceof Vector) {

    } else {

    }
  }
  set_object_rotation(sandboxObject: WLSandboxObject, ...args: [x: number, y: number, z: number] | [vector: WLVector]) {
    return set_object_rotation(#object, ...args, y, z] | [vector]);
  }
  set_object_scale(sandboxObject: WLSandboxObject, ...args: [x: number, y: number, z: number] | [vector: WLVector]) {
    return set_object_scale(#object, ...args, y, z] | [vector]);
  }
  set_object_local_position(sandboxObject: WLSandboxObject, ...args: [x: number, y: number, z: number] | [vector: WLVector]) {
    return set_object_local_position(#object, ...args, y, z] | [vector]);
  }
  set_object_local_rotation(sandboxObject: WLSandboxObject, ...args: [x: number, y: number, z: number] | [vector: WLVector]) {
    return set_object_local_rotation(#object, ...args, y, z] | [vector]);
  }
  set_object_local_scale(sandboxObject: WLSandboxObject, ...args: [x: number, y: number, z: number] | [vector: WLVector]) {
    return set_object_local_scale(#object, ...args, y, z] | [vector]);
  }
  get_object_position(sandboxObject: WLSandboxObject) {
    return get_object_position(#object);
  }
  get_object_rotation(sandboxObject: WLSandboxObject) {
    return get_object_rotation(#object);
  }
  get_object_scale(sandboxObject: WLSandboxObject) {
    return get_object_scale(#object);
  }
  get_object_local_position(sandboxObject: WLSandboxObject) {
    return get_object_local_position(#object);
  }
  get_object_local_rotation(sandboxObject: WLSandboxObject) {
    return get_object_local_rotation(#object);
  }
  get_object_local_scale(sandboxObject: WLSandboxObject) {
    return get_object_local_scale(#object);
  }
  dispatch_event_to_object(eventName: string, eventValue: WLValue, sandboxObject: WLSandboxObject) {
    return dispatch_event_to_object(eventName, eventValue, #object);
  }
  get_object_name(sandboxObject: WLSandboxObject) {
    return get_object_name(#object);
  }
  get_object_forward_vector(sandboxObject: WLSandboxObject) {
    return get_object_forward_vector(#object);
  }
  get_object_right_vector(sandboxObject: WLSandboxObject) {
    return get_object_right_vector(#object);
  }
  get_object_up_vector(sandboxObject: WLSandboxObject) {
    return get_object_up_vector(#object);
  }
  get_object_back_vector(sandboxObject: WLSandboxObject) {
    return get_object_back_vector(#object);
  }
  get_object_left_vector(sandboxObject: WLSandboxObject) {
    return get_object_left_vector(#object);
  }
  get_object_down_vector(sandboxObject: WLSandboxObject) {
    return get_object_down_vector(#object);
  }
  get_object_float_option(sandboxObject: WLSandboxObject, optionName: string) {
    return get_object_float_option(#object, optionName);
  }
  get_object_integer_option(sandboxObject: WLSandboxObject, optionName: string) {
    return get_object_integer_option(#object, optionName);
  }
  get_object_string_option(sandboxObject: WLSandboxObject, optionName: string) {
    return get_object_string_option(#object, optionName);
  }
  get_object_bool_option(sandboxObject: WLSandboxObject, optionName: string) {
    return get_object_bool_option(#object, optionName);
  }
  get_object_vector_option(sandboxObject: WLSandboxObject, optionName: string) {
    return get_object_vector_option(#object, optionName);
  }
  get_object_color_option(sandboxObject: WLSandboxObject, optionName: string) {
    return get_object_color_option(#object, optionName);
  }
  set_object_float_option(sandboxObject: WLSandboxObject, optionName: string, optionValue: WLValue) {
    return set_object_float_option(#object, optionName, optionValue);
  }
  set_object_integer_option(sandboxObject: WLSandboxObject, optionName: string, optionValue: WLValue) {
    return set_object_integer_option(#object, optionName, optionValue);
  }
  set_object_string_option(sandboxObject: WLSandboxObject, optionName: string, optionValue: WLValue) {
    return set_object_string_option(#object, optionName, optionValue);
  }
  set_object_bool_option(sandboxObject: WLSandboxObject, optionName: string, optionValue: WLValue) {
    return set_object_bool_option(#object, optionName, optionValue);
  }
  set_object_vector_option(sandboxObject: WLSandboxObject, optionName: string, optionValue: WLValue) {
    return set_object_vector_option(#object, optionName, optionValue);
  }
  set_object_color_option(sandboxObject: WLSandboxObject, optionName: string, optionValue: WLValue) {
    return set_object_color_option(#object, optionName, optionValue);
  }
  get_object_parent(sandboxObject: WLSandboxObject) {
    return get_object_parent(#object#object;
  }
  get_object_children(sandboxObject: WLSandboxObject): WLSandboxObje {
    return get_object_children(#object#object[];
  }
  get_object_children_recursive(sandboxObject: WLSandboxObject): WLSandboxObje {
    return get_object_children_recursive(#object#object[];
  }
  add_event_to_dispatcher(sandboxObject: WLSandboxObject, dispatcherID: string, eventName: string, eventValue: WLValue) {
    return add_event_to_dispatcher(#object, dispatcherID, eventName, eventValue);
  }
  remove_event_from_dispatcher(sandboxObject: WLSandboxObject, dispatcherID: string, eventName: string) {
    return remove_event_from_dispatcher(#object, dispatcherID, eventName);
  }
  add_event_to_receiver(sandboxObject: WLSandboxObject, receiverID: string, eventName: string, eventValue: WLValue) {
    return add_event_to_receiver(#object, receiverID, eventName, eventValue);
  }
  remove_event_from_receiver(sandboxObject: WLSandboxObject, receiverID: string, eventName: string) {
    return remove_event_from_receiver(#object, receiverID, eventName);
  }
  get_object_visibility(sandboxObject: WLSandboxObject) {
    return get_object_visibility(#object);
  }
  set_object_visibility(sandboxObject: WLSandboxObject, newVisibility: boolean) {
    return set_object_visibility(#object, newVisibility);
  }
  get_object_dispatchers_enabled(sandboxObject: WLSandboxObject) {
    return get_object_dispatchers_enabled(#object);
  }
  set_object_dispatchers_enabled(sandboxObject: WLSandboxObject, newEnabled: boolean) {
    return set_object_dispatchers_enabled(#object, newEnabled);
  }
  get_object_receivers_enabled(sandboxObject: WLSandboxObject) {
    return get_object_receivers_enabled(#object);
  }
  set_object_receivers_enabled(sandboxObject: WLSandboxObject, newEnabled: boolean) {
    return set_object_receivers_enabled(#object, newEnabled);
  }
}
