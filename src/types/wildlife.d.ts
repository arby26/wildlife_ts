/**
 * This just contains a reference to a sandbox object in the outliner and can be used as a parameter in subsequent function calls.
 */
declare class WLSandboxObject {}

/**
 * The Vector contains three components x, y and z, one for each axis.
 */
declare class WLVector {
  /**
   * The X component of the vector
   */
  x: number;

  /**
   * The Y component of the vector
   */
  y: number;

  /**
   * The Z component of the vector
   */
  z: number;
}

/**
 * The Color contains four components r, g, b and a, one for each color channel.
 */
declare class WLColor {
  /**
   * The red component of the color
   */
  r: number;

  /**
   * The green component of the color
   */
  g: number;

  /**
   * The blue component of the color
   */
  b: number;

  /**
   * The alpha component of the color
   */
  a: number;
}

declare class WLRayCastHit {
  did_hit: boolean;
  hit_point: WLVector;
  hit_normal: WLVector;
  time: number;
  distance: number;
  hit_sandbox_object: WLSandboxObject;
}

/**
 * A VectorString is the text representation of a Vector, used primarily for setting option values in the event system. This is only one part of the full OptionVectorString, which would be needed to be able to set the event system values.
 *
 * It will have the format
 *
 * "x=[xValue],y=[yValue],z=[zValue]"
 *
 * so for example
 *
 * "x=1.0,y=2.0,z=3.0"
 */
declare class WLVectorString extends String {}

/**
 * An OptionVectorString is the text representation of a Vector together with an option name, used primarily for setting option values in the event system.
 * 
 * It will have the format
 * 
 * "[optionName];x=[xValue],y=[yValue],z=[zValue]"
 * 
 * so for example
 * 
 * "StartLocation;x=1.0,y=2.0,z=3.0"
 */
declare class WLOptionVectorString extends String {}

/**
 * A ColorString is the text representation of a Color, used primarily for setting option values in the event system. This is only one part of the full OptionColorString, which would be needed to be able to set the event system values.
 * 
 * It will have the format
 * 
 * "r=[rValue],g=[gValue],b=[bValue],a=[aValue]"
 * 
 * so for example
 * 
 * "r=0.5,g=0.2,b=0.75,a=1.0"
 */
declare class WLColorString extends String {}

/**
 * An OptionColorString is the text representation of a Color together with an option name, used primarily for setting option values in the event system.
 * 
 * It will have the format
 * 
 * "[optionName];r=[rValue],g=[gValue],b=[bValue],a=[aValue]"
 * 
 * so for example
 * 
 * "color;r=0.5,g=0.2,b=0.75,a=1.0"
 */
declare class WLOptionColorString extends String {}

type Primitives = number | string | boolean | undefined;

/**
 * Any type of value that can be set as value on the event system.
 */
type WLValue = Primitives | WLColorString | WLOptionColorString | WLVectorString | WLOptionVectorString;

/**
 * Data that can be stringified in to json. 
 */
type JsonData = {[key: string]: JsonData} | WLValue;

/**
 * Returns a reference to the first sandbox object in the outliner named 'objectName'. Since this function potentially needs to iterate over lots of sandbox objects, it is better to cache the return value in a variable at game start and then using the variable in subsequent function calls
 * 
 * @example
 * ```lua
 * cube = wl_get_object("Cube")
 * print(cube)
 * ```
 * This code will get a sandbox object with the name "Cube" and print it's ID to the log
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object | View online documentation}
 * @param objectName - The name of the sandbox object to retrieve.
 * @returns Reference to the sandbox object.
 */
declare function wl_get_object(objectName: string): WLSandboxObject;

/**
 * Returns a reference to the Lua sandbox object that is currently executing this code.
 * 
 * @example
 * ```lua
 * lua = wl_get_object_self()
 * print(lua)
 * ```
 * This code will get the currently executing Lua prop and print it's ID to the log
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_self | View online documentation}
 * @returns Reference to the currently executing Lua prop.
 */
declare function wl_get_object_self(): WLSandboxObject;

/**
 * Similarly to wl_get_object, this returns a sandbox object with the name 'objectName', but it will only search for a sandbox object that is parented below the given 'sandboxObject'. Since this function potentially needs to iterate over lots of sandbox objects, it is better to cache the return value in a variable at game start and then using the variable in subsequent function calls
 * Example:
 * Say we have the following outliner hierarchy:
 * Lamp Post 1
 *     Post
 *     Light
 * Lamp Post 2
 *     Post
 *     Light
 * Lamp Post 3
 *     Post
 *     Light
 * As you can see, there are multiple sandbox objects with the name "Light". 
 * ```lua
 * lamp_post = wl_get_object("Lamp post 2")
 * light = wl_get_object_below("Light", lamp_post)
 * print(light)
 * ```
 * This example code would print the ID of the "Light" object under "Lamp post 2", since that was the given second parameter.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_below | View online documentation}
 * @param objectName - The name of the sandbox object to retrieve.
 * @param sandboxObject - The parent sandbox object.
 * @returns Reference to the sandbox object below the given parent.
 */
declare function wl_get_object_below(objectName: string, sandboxObject: WLSandboxObject): WLSandboxObject;

/**
 * This function can be used to set the world position of a sandbox object directly.
 * 
 * @example
 * ```lua
 * sphere = wl_get_object("Sphere")
 * wl_set_object_position(sphere, 0, 1000, 0)
 * 
 * -- Alternatively
 * sphere = wl_get_object("Sphere")
 * vec = wl_make_vector(0, 1000, 0)
 * wl_set_object_position(sphere, vec)
 * 
 * ```
 * This code will teleport the first sandbox object named "Sphere" to the world coordinates x=0, y=1000, z=0. The units are in centimeters. Alternatively, you can also provide a vector instead of x, y and z separately.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_set_object_position | View online documentation}
 * @param sandboxObject - The sandbox object to set the position for.
 * @param args - Either x, y, and z coordinates, or a vector with x, y, and z components.
 */
declare function wl_set_object_position(sandboxObject: WLSandboxObject, ...args: [x: number, y: number, z: number] | [vector: WLVector]): void;

/**
 * This function can be used to set the world rotation of a sandbox object directly.
 * 
 * @example
 * ```lua
 * windmill = wl_get_object("Windmill")
 * wl_set_object_rotation(windmill, 0, 0, 180)
 * 
 * -- Alternatively
 * windmill = wl_get_object("Windmill")
 * vec = wl_make_vector(0, 0, 180)
 * wl_set_object_rotation(windmill, vec)
 * 
 * ```
 * This code will set the world rotation of the first sandbox object named "Windmill" to x=0, y=0, z=180. The units are in degrees. Alternatively, you can also provide a vector instead of x, y and z separately.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_set_object_rotation | View online documentation}
 * @param sandboxObject - The sandbox object to set the rotation for.
 * @param args - Either x, y, and z rotation angles in degrees, or a vector with x, y, and z angles.
 */
declare function wl_set_object_rotation(sandboxObject: WLSandboxObject, ...args: [x: number, y: number, z: number] | [vector: WLVector]): void;

/**
 * This function can be used to set the world scale of a sandbox object directly.
 * 
 * @example
 * ```lua
 * balloon = wl_get_object("Balloon")
 * wl_set_object_scale(balloon, 2, 2, 2)
 * 
 * -- Alternatively
 * balloon = wl_get_object("Balloon")
 * vec = wl_make_vector(2, 2, 2)
 * wl_set_object_scale(balloon, vec)
 * 
 * ```
 * This code will set the world scale of the first sandbox object named "Balloon" to x=2, y=2, z=2. The units are scale units, meaning x=1, y=1, z=1 is "normal" scale. Thus, this code doubles the balloon's size. Alternatively, you can also provide a vector instead of x, y and z separately.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_set_object_scale | View online documentation}
 * @param sandboxObject - The sandbox object to set the scale for.
 * @param args - Either x, y, and z scale factors, or a vector with x, y, and z scales.
 */
declare function wl_set_object_scale(sandboxObject: WLSandboxObject, ...args: [x: number, y: number, z: number] | [vector: WLVector]): void;

/**
 * This function can be used to set the position relative to the parent of a sandbox object directly.
 * 
 * @example
 * ```lua
 * sphere = wl_get_object("Sphere")
 * wl_set_object_local_position(sphere, 0, 0, 0)
 * 
 * -- Alternatively
 * sphere = wl_get_object("Sphere")
 * vec = wl_make_vector(0, 0, 0)
 * wl_set_object_local_position(sphere, vec)
 * 
 * ```
 * This code will teleport the first sandbox object named "Sphere" to the local coordinates x=0, y=0, z=0. Since the coordinates are relative to the parent, this effectively sets the position of this object to the same position as the parent. Alternatively, you can also provide a vector instead of x, y and z separately.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_set_object_local_position | View online documentation}
 * @param sandboxObject - The sandbox object to set the local position for.
 * @param args - Either x, y, and z local coordinates, or a vector with x, y, and z components.
 */
declare function wl_set_object_local_position(sandboxObject: WLSandboxObject, ...args: [x: number, y: number, z: number] | [vector: WLVector]): void;

/**
 * This function can be used to set the rotation relative to the parent of a sandbox object directly.
 * 
 * @example
 * ```lua
 * windmill = wl_get_object("Windmill")
 * wl_set_object_local_rotation(windmill, 0, 0, 180)
 * 
 * -- Alternatively
 * windmill = wl_get_object("Windmill")
 * vec = wl_make_vector(0, 0, 180)
 * wl_set_object_local_rotation(windmill, vec)
 * 
 * ```
 * This code will set the local rotation of the first sandbox object named "Windmill" to x=0, y=0, z=180, meaning it will have the same rotation as it's parent, but rotated 180 degrees around whatever the parent considers "up". Alternatively, you can also provide a vector instead of x, y and z separately.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_set_object_local_rotation | View online documentation}
 * @param sandboxObject - The sandbox object to set the local rotation for.
 * @param args - Either x, y, and z local rotation angles in degrees, or a vector with x, y, and z angles.
 */
declare function wl_set_object_local_rotation(sandboxObject: WLSandboxObject, ...args: [x: number, y: number, z: number] | [vector: WLVector]): void;

/**
 * This function can be used to set the scale relative to the parent of a sandbox object directly.
 * 
 * @example
 * ```lua
 * balloon = wl_get_object("Balloon")
 * wl_set_object_local_scale(balloon, 2, 2, 2)
 * 
 * -- Alternatively
 * balloon = wl_get_object("Balloon")
 * vec = wl_make_vector(2, 2, 2)
 * wl_set_object_local_scale(balloon, vec)
 * 
 * ```
 * This code will set the local scale of the first sandbox object named "Balloon" to x=2, y=2, z=2. Alternatively, you can also provide a vector instead of x, y and z separately.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_set_object_local_scale | View online documentation}
 * @param sandboxObject - The sandbox object to set the local scale for.
 * @param args - Either x, y, and z local scale factors, or a vector with x, y, and z scales.
 */
declare function wl_set_object_local_scale(sandboxObject: WLSandboxObject, ...args: [x: number, y: number, z: number] | [vector: WLVector]): void;

/**
 * Returns the world position of the given 'sandboxObject' as a Vector.
 * 
 * @example
 * ```lua
 * tree = wl_get_object("Tree")
 * pos = wl_get_object_position(tree)
 * print(pos.x)
 * print(pos.y)
 * print(pos.z)
 * ```
 * This code will get the first sandbox object named "Tree" and print it's world coordinates into the log.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_position | View online documentation}
 * @param sandboxObject - The sandbox object to get the world position for.
 * @returns The world position vector.
 */
declare function wl_get_object_position(sandboxObject: WLSandboxObject): WLVector;

/**
 * Returns the world rotation of the given 'sandboxObject' as a Vector.
 * 
 * @example
 * ```lua
 * fan = wl_get_object("Fan")
 * rot = wl_get_object_rotation(fan)
 * print(rot.x)
 * print(rot.y)
 * print(rot.z)
 * ```
 * This code will get the first sandbox object named "Fan" and print it's world rotation into the log.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_rotation | View online documentation}
 * @param sandboxObject - The sandbox object to get the world rotation for.
 * @returns The world rotation vector.
 */
declare function wl_get_object_rotation(sandboxObject: WLSandboxObject): WLVector;

/**
 * Returns the world scale of the given 'sandboxObject' as a Vector.
 * 
 * @example
 * ```lua
 * ball = wl_get_object("Ball")
 * scale = wl_get_object_scale(ball)
 * print(scale.x)
 * print(scale.y)
 * print(scale.z)
 * ```
 * This code will get the first sandbox object named "Ball" and print it's world scale into the log.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_scale | View online documentation}
 * @param sandboxObject - The sandbox object to get the world scale for.
 * @returns The world scale vector.
 */
declare function wl_get_object_scale(sandboxObject: WLSandboxObject): WLVector;

/**
 * Returns the relative position to the parent of the given 'sandboxObject' as a Vector.
 * 
 * @example
 * ```lua
 * tree = wl_get_object("Tree")
 * pos = wl_get_object_local_position(tree)
 * print(pos.x)
 * print(pos.y)
 * print(pos.z)
 * ```
 * This code will get the first sandbox object named "Tree" and print it's local coordinates into the log.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_local_position | View online documentation}
 * @param sandboxObject - The sandbox object to get the local position for.
 * @returns The local position vector.
 */
declare function wl_get_object_local_position(sandboxObject: WLSandboxObject): WLVector;

/**
 * Returns the relative rotation to the parent of the given 'sandboxObject' as a Vector.
 * 
 * @example
 * ```lua
 * fan = wl_get_object("Fan")
 * rot = wl_get_object_local_rotation(fan)
 * print(rot.x)
 * print(rot.y)
 * print(rot.z)
 * ```
 * This code will get the first sandbox object named "Fan" and print it's local rotation into the log.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_local_rotation | View online documentation}
 * @param sandboxObject - The sandbox object to get the local rotation for.
 * @returns The local rotation vector.
 */
declare function wl_get_object_local_rotation(sandboxObject: WLSandboxObject): WLVector;

/**
 * Returns the relative scale to the parent of the given 'sandboxObject' as a Vector.
 * 
 * @example
 * ```lua
 * ball = wl_get_object("Ball")
 * scale = wl_get_object_local_scale(ball)
 * print(scale.x)
 * print(scale.y)
 * print(scale.z)
 * ```
 * This code will get the first sandbox object named "Ball" and print it's local scale into the log.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_local_scale | View online documentation}
 * @param sandboxObject - The sandbox object to get the local scale for.
 * @returns The local scale vector.
 */
declare function wl_get_object_local_scale(sandboxObject: WLSandboxObject): WLVector;

/**
 * Dispatches an event just like any other prop can using the event system. As the parameters suggest, 'eventName' would be the name of the event to be fired, and 'eventValue' would be the value (or parameter) of the event.
 * 
 * @example
 * ```lua
 * wl_dispatch_event("ButtonVisibility", false)
 * ```
 * Let's say the current sandbox scene contains a Button that has "ButtonVisibility" bound to it's "Set visibility" receiver. This code would make that button invisible when executed. Similarly, if you would use "true" instead of "false", the button would become visible again.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_dispatch_event | View online documentation}
 * @param eventName - The name of the event to be fired.
 * @param eventValue - The value or parameter of the event.
 */
declare function wl_dispatch_event(eventName: string, eventValue: WLValue): void;

/**
 * Dispatches an event just like any other prop can using the event system, except it will only send it to 'sandboxObject'. As the parameters suggest, 'eventName' would be the name of the event to be fired, and 'eventValue' would be the value (or parameter) of the event.
 * 
 * @example
 * ```lua
 * button = wl_get_object("Play Button")
 * wl_dispatch_event_to_object("ButtonVisibility", false)
 * ```
 * If there are multiple objects that use "ButtonVisibility" in any of their receivers, none of them will receive the event unless they are the first sandbox object named "Play Button".
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_dispatch_event_to_object | View online documentation}
 * @param eventName - The name of the event to be fired.
 * @param eventValue - The value or parameter of the event.
 * @param sandboxObject - The sandbox object to which the event should be sent.
 */
declare function wl_dispatch_event_to_object(eventName: string, eventValue: WLValue, sandboxObject: WLSandboxObject): void;

/**
 * When using the event system, some receivers require option vector strings as parameters (for example, setting the start value on a Transformer prop). This is just a helper function to create only the vector part of an event parameter. If you want the full option vector string, see wl_make_option_vector_string().
 * 
 * @example
 * ```lua
 * vector_string = wl_make_vector_string(3.4, 1.0, 5.7)
 * 	
 * -- Alternatively
 * vector = wl_make_vector(3.4, 1.0, 5.7)
 * vector_string = wl_make_vector_string(vector)
 * ```
 * This function would return a string into 'vector_string' that looks as follows: "x=3.4,y=1.0,z=5.7".
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_make_vector_string | View online documentation}
 * @param args - Either x, y, and z coordinates, or a vector with x, y, and z components.
 * @returns The created vector string.
 */
declare function wl_make_vector_string(...args: [x: number, y: number, z: number] | [vector: WLVector]): WLVectorString;

/**
 * When using the event system, some receivers require option vector strings as parameters (for example, setting the start value on a Transformer prop). This is just a helper function to create these option vector strings.
 * 
 * @example
 * ```lua
 * option_vector_string = wl_make_option_vector_string("StartLocation", 3.4, 1.0, 5.7)
 * 	
 * -- Alternatively
 * vector = wl_make_vector(3.4, 1.0, 5.7)
 * vector_string = wl_make_option_vector_string("StartLocation", vector)
 * ```
 * This function would return a string into 'option_vector_string' that looks as follows: "StartLocation;x=3.4,y=1.0,z=5.7". That string could then be used in a wl_dispatch_event("SetOption", option_vector_string) function call for example.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_make_option_vector_string | View online documentation}
 * @param optionName - The name of the option.
 * @param args - Either x, y, and z coordinates, or a vector with x, y, and z components.
 * @returns The created option vector string.
 */
declare function wl_make_option_vector_string(optionName: string, ...args: [x: number, y: number, z: number] | [vector: WLVector]): WLOptionVectorString;

/**
 * When using the event system, some receivers require option color strings as parameters (for example, setting the color of a prototype shape). This is just a helper function to create only the color part of an event parameter. If you want the full option color string, see wl_make_option_color_string().
 * 
 * @example
 * ```lua
 * color_string = wl_make_color_string(0.5, 0.2, 1.0, 1.0)
 * 	
 * -- Alternatively
 * color = wl_make_color(0.5, 0.2, 1.0, 1.0)
 * color_string = wl_make_color_string(color)
 * ```
 * This function would return a string into 'color_string' that looks as follows: "r=0.5,g=0.2,b=1.0,a=1.0".
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_make_color_string | View online documentation}
 * @param args - Either red, green, blue, and alpha color components, or a color vector with these components.
 * @returns The created color string.
 */
declare function wl_make_color_string(...args: [r: number, g: number, b: number, a: number] | [color: WLColor]): WLColorString;

/**
 * When using the event system, some receivers require option color strings as parameters (for example, setting the color on a prototype shape). This is just a helper function to create these option color strings.
 * 
 * @example
 * ```lua
 * option_color_string = wl_make_option_color_string("color", 0.5, 0.2, 1.0, 1.0)
 * 	
 * -- Alternatively
 * color = wl_make_color(0.5, 0.2, 1.0, 1.0)
 * color_string = wl_make_option_color_string("color", color)
 * ```
 * This function would return a string into 'option_color_string' that looks as follows: "color;r=0.5,g=0.2,b=1.0,a=1.0". That string could then be used in a wl_dispatch_event("SetOption", option_color_string) function call for example.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_make_option_color_string | View online documentation}
 * @param optionName - The name of the option.
 * @param args - Either red, green, blue, and alpha color components, or a color vector with these components.
 * @returns The created option color string.
 */
declare function wl_make_option_color_string(optionName: string, ...args: [r: number, g: number, b: number, a: number] | [color: WLColor]): WLOptionColorString;

/**
 * Unlike wl_make_vector_string, this function does not create a single string containing all values. Instead, it returns a table with x, y and z set to the given parameter values.
 * 
 * @example
 * ```lua
 * vector = wl_make_vector(3.4, 1.0, 5.7)
 * print(vector.x)
 * print(vector.y)
 * print(vector.z)
 * ```
 * This code creates a vector and prints the individual components. The vector can be used for various vector operations for ease of use.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_make_vector | View online documentation}
 * @param x - The x component of the vector.
 * @param y - The y component of the vector.
 * @param z - The z component of the vector.
 * @returns The created vector.
 */
declare function wl_make_vector(x: number, y: number, z: number): WLVector;

/**
 * Unlike wl_make_color_string, this function does not create a single string containing all values. Instead, it returns a table with r, g, b and a set to the given parameter values.
 * 
 * @example
 * ```lua
 * color = wl_make_color(0.5, 0.24, 0.75, 1.0)
 * print(color.r)
 * print(color.g)
 * print(color.b)
 * print(color.a)
 * ```
 * This code creates a color and prints the individual components. The color can be used for various operations for ease of use.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_make_color | View online documentation}
 * @param r - The red component of the color (0-1).
 * @param g - The green component of the color (0-1).
 * @param b - The blue component of the color (0-1).
 * @param a - The alpha component of the color (0-1).
 * @returns The created color.
 */
declare function wl_make_color(r: number, g: number, b: number, a: number): WLColor;

/**
 * This will cast an ray from the given location 'originVector' in the direction of 'directionVector' with a max distance of 'maxDistance'. If the ray hits anything on it's path, it will add useful hit information into a the returned RayCastHit table.
 * 
 * @example
 * ```lua
 * origin = wl_make_vector(0.0, 0.0, 500.0)
 * direction = wl_make_vector(0.0, 0.0, -1.0)
 * hit = wl_raycast(origin, direction, 1000)
 * print(hit.did_hit)
 * print(hit.hit_point.x)
 * print(hit.hit_point.y)
 * print(hit.hit_point.z)
 * print(hit.hit_normal.x)
 * print(hit.hit_normal.y)
 * print(hit.hit_normal.z)
 * print(hit.time)
 * print(hit.distance)
 * print(hit.hit_sandbox_object)
 * ```
 * This code starts a ray 5 meters above the ground and fires downwards 10 meters. In the flat Showroom map, it will hit the floor at x=0, y=0, z=0. All the hit information will then be printed into the log. If you want more information about what the return values do or show, see RayCastHit.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_raycast | View online documentation}
 * @param originVector - The origin point of the ray.
 * @param directionVector - The direction in which the ray is cast.
 * @param maxDistance - The maximum distance the ray can travel.
 * @returns Information about the raycast hit in the form of a RayCastHit object.
 */
declare function wl_raycast(originVector: WLVector, directionVector: WLVector, maxDistance: number): WLRayCastHit;

/**
 * This functions return the time since the last frame, in seconds. This is useful if you want to build functionality that is not dependent on the framerate, like moving an object forwards by a constant value.
 * 
 * @example
 * ```lua
 * orb = wl_get_object("Orb")
 * orbPos = wl_get_object_position(orb)
 * orbPos.x = orbPos.x + wl_get_delta_time() * 5
 * wl_set_object_position(orb, orbPos.x, orbPos.y, orbPos.z)
 * ```
 * This function will get the first sandbox object called "Orb" and get it's current position. Then, it will add an offset to it's x coordinate using the delta time to ensure constant movement. If this function was to be called every frame, this would mean the orb would move 5 centimeters along the axis per second.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_delta_time | View online documentation}
 * @returns The time in seconds since the last frame.
 */
declare function wl_get_delta_time(): number;

/**
 * Returns the current player object.
 * 
 * @example
 * ```lua
 * player = wl_get_player_object()
 * print(player)
 * ```
 * This code will get the current player object and print it's ID into the log. It doesn't matter whether you possessed another object since game start, as soon as wl_get_player_object is called, it will contain the current player object.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_player_object | View online documentation}
 * @returns The current player object.
 */
declare function wl_get_player_object(): WLSandboxObject;

/**
 * Returns the name of the sandbox object. This is the same name as the one you can see in the outliner.
 * 
 * @example
 * ```lua
 * player = wl_get_player_object()
 * name = wl_get_object_name(player)
 * print(name)
 * ```
 * This code will get the current player object and print it's name into the log.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_name | View online documentation}
 * @param sandboxObject - The sandbox object to get the name for.
 * @returns The name of the sandbox object.
 */
declare function wl_get_object_name(sandboxObject: WLSandboxObject): string;

/**
 * Returns the forward direction vector of the given 'sandboxObject'.
 * 
 * @example
 * ```lua
 * player = wl_get_player_object()
 * vector = wl_get_object_forward_vector(player)
 * wl_print_vector(vector)
 * ```
 * This code will get the player object and print it's forward facing direction into the log.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_forward_vector | View online documentation}
 * @param sandboxObject - The sandbox object to get the forward vector for.
 * @returns The forward direction vector.
 */
declare function wl_get_object_forward_vector(sandboxObject: WLSandboxObject): WLVector;

/**
 * Returns the right direction vector of the given 'sandboxObject'.
 * 
 * @example
 * ```lua
 * player = wl_get_player_object()
 * vector = wl_get_object_right_vector(player)
 * wl_print_vector(vector)
 * ```
 * This code will get the player object and print it's right facing direction into the log.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_right_vector | View online documentation}
 * @param sandboxObject - The sandbox object to get the right vector for.
 * @returns The right direction vector.
 */
declare function wl_get_object_right_vector(sandboxObject: WLSandboxObject): WLVector;

/**
 * Returns the up direction vector of the given 'sandboxObject'.
 * 
 * @example
 * ```lua
 * player = wl_get_player_object()
 * vector = wl_get_object_up_vector(player)
 * wl_print_vector(vector)
 * ```
 * This code will get the player object and print it's up facing direction into the log.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_up_vector | View online documentation}
 * @param sandboxObject - The sandbox object to get the up vector for.
 * @returns The up direction vector.
 */
declare function wl_get_object_up_vector(sandboxObject: WLSandboxObject): WLVector;

/**
 * Returns the back direction vector of the given 'sandboxObject'.
 * 
 * @example
 * ```lua
 * player = wl_get_player_object()
 * vector = wl_get_object_back_vector(player)
 * wl_print_vector(vector)
 * ```
 * This code will get the player object and print it's back facing direction into the log.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_back_vector | View online documentation}
 * @param sandboxObject - The sandbox object to get the back vector for.
 * @returns The back direction vector.
 */
declare function wl_get_object_back_vector(sandboxObject: WLSandboxObject): WLVector;

/**
 * Returns the left direction vector of the given 'sandboxObject'.
 * 
 * @example
 * ```lua
 * player = wl_get_player_object()
 * vector = wl_get_object_left_vector(player)
 * wl_print_vector(vector)
 * ```
 * This code will get the player object and print it's left facing direction into the log.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_left_vector | View online documentation}
 * @param sandboxObject - The sandbox object to get the left vector for.
 * @returns The left direction vector.
 */
declare function wl_get_object_left_vector(sandboxObject: WLSandboxObject): WLVector;

/**
 * Returns the down direction vector of the given 'sandboxObject'.
 * 
 * @example
 * ```lua
 * player = wl_get_player_object()
 * vector = wl_get_object_down_vector(player)
 * wl_print_vector(vector)
 * ```
 * This code will get the player object and print it's down facing direction into the log.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_down_vector | View online documentation}
 * @param sandboxObject - The sandbox object to get the down vector for.
 * @returns The down direction vector.
 */
declare function wl_get_object_down_vector(sandboxObject: WLSandboxObject): WLVector;

/**
 * Adds 'vectorA' and 'vectorB' together component wise, or alternatively adds 'vectorA' and 'numB' together, meaning 'numB' is added to all x, y and z components of the vector.
 * 
 * @example
 * ```lua
 * vec1 = wl_make_vector(1,2,3)
 * vec2 = wl_make_vector(4,5,6)
 * vec3 = wl_vector_add(vec1, vec2)
 * vec4 = wl_vector_add(vec1, 5)
 * wl_print_vector(vec3)
 * wl_print_vector(vec4)
 * ```
 * This code creates two vectors, adds them together and prints the result into the log. It also adds a fixed value '5' to the first vector and prints that result into the log too.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_vector_add | View online documentation}
 * @param vectorA - The first vector.
 * @param b - Either a second vector to add or a number to add to each component.
 * @returns The resulting vector after addition.
 */
declare function wl_vector_add(vectorA: WLVector, b: WLVector | number): WLVector;

/**
 * Subtracts 'vectorB' from 'vectorA' component wise, or alternatively subtracts 'numB' from 'vectorA', meaning 'numB' is subtracted from all x, y and z components of the vector.
 * 
 * @example
 * ```lua
 * vec1 = wl_make_vector(1,2,3)
 * vec2 = wl_make_vector(4,5,6)
 * vec3 = wl_vector_subtract(vec1, vec2)
 * vec4 = wl_vector_subtract(vec1, 5)
 * wl_print_vector(vec3)
 * wl_print_vector(vec4)
 * ```
 * This code creates two vectors, subtracts them and prints the result into the log. It also subtracts a fixed value '5' from the first vector and prints that result into the log too.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_vector_subtract | View online documentation}
 * @param vectorA - The first vector.
 * @param vectorB - Either a second vector to subtract or a number to subtract from each component.
 * @returns The resulting vector after subtraction.
 */
declare function wl_vector_subtract(vectorA: WLVector, vectorB: WLVector | number): WLVector;

/**
 * Multiplies 'vectorA' and 'vectorB' together component wise, or alternatively multiplies 'vectorA' and 'numB' together, meaning each x, y and z component is multiplied with 'numB'.
 * 
 * @example
 * ```lua
 * vec1 = wl_make_vector(1,2,3)
 * vec2 = wl_make_vector(4,5,6)
 * vec3 = wl_vector_multiply(vec1, vec2)
 * vec4 = wl_vector_multiply(vec1, 5)
 * wl_print_vector(vec3)
 * wl_print_vector(vec4)
 * ```
 * This code creates two vectors, multiplies them together and prints the result into the log. It also multiplies a fixed value '5' to the first vector and prints that result into the log too.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_vector_multiply | View online documentation}
 * @param vectorA - The first vector.
 * @param vectorB - Either a second vector to multiply with or a number to multiply with each component.
 * @returns The resulting vector after multiplication.
 */
declare function wl_vector_multiply(vectorA: WLVector, vectorB: WLVector | number): WLVector;

/**
 * Divides 'vectorB' from 'vectorA' component wise, or alternatively divides 'numB' from 'vectorA', meaning 'numB' is divided from all x, y and z components of the vector.
 * 
 * @example
 * ```lua
 * vec1 = wl_make_vector(1,2,3)
 * vec2 = wl_make_vector(4,5,6)
 * vec3 = wl_vector_divide(vec1, vec2)
 * vec4 = wl_vector_divide(vec1, 5)
 * wl_print_vector(vec3)
 * wl_print_vector(vec4)
 * ```
 * This code creates two vectors, divides them and prints the result into the log. It also divides a fixed value '5' from the first vector and prints that result into the log too.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_vector_divide | View online documentation}
 * @param vectorA - The first vector.
 * @param vectorB - Either a second vector to divide by or a number to divide each component by.
 * @returns The resulting vector after division.
 */
declare function wl_vector_divide(vectorA: WLVector, vectorB: WLVector | number): WLVector;

/**
 * Normalizes the given vector 'vector', meaning the direction will remain the same, but the length of the vector will be exaclty 1 centimeter
 * 
 * @example
 * ```lua
 * vec1 = wl_make_vector(1,2,3)
 * vec2 = wl_vector_normalize(vec1)
 * wl_print_vector(vec2)
 * ```
 * This code creates a vector, normalizes it and prints the resulting vector into the log.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_vector_normalize | View online documentation}
 * @param vector - The vector to be normalized.
 * @returns The normalized vector.
 */
declare function wl_vector_normalize(vector: WLVector): WLVector;

/**
 * Calculates the dot product between 'vectorA' and 'vectorB', meaning all x, y, z components are multiplied component wise and the resulting components are summed together.
 * 
 * @example
 * ```lua
 * vec1 = wl_make_vector(1,2,3)
 * vec2 = wl_make_vector(4,5,6)
 * dot = wl_vector_dot(vec1, vec2)
 * print(dot)
 * ```
 * This code creates two vectors, calculates the dot product between them and prints the result into the log.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_vector_dot | View online documentation}
 * @param vectorA - The first vector.
 * @param vectorB - The second vector.
 * @returns The dot product value.
 */
declare function wl_vector_dot(vectorA: WLVector, vectorB: WLVector): number;

/**
 * Calculates the cross product between 'vectorA' and 'vectorB', meaning it finds a vector that is perpendicular to both 'vectorA' and 'vectorB'.
 * 
 * @example
 * ```lua
 * vec1 = wl_make_vector(1,2,3)
 * vec2 = wl_make_vector(4,5,6)
 * vec3 = wl_vector_cross(vec1, vec2)
 * wl_print_vector(vec3)
 * ```
 * This code creates two vectors, calculates the cross product and prints the resulting vector into the log.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_vector_cross | View online documentation}
 * @param vectorA - The first vector.
 * @param vectorB - The second vector.
 * @returns The resulting cross product vector.
 */
declare function wl_vector_cross(vectorA: WLVector, vectorB: WLVector): WLVector;

/**
 * Calculates the reflected vector of 'vectorA' bouncing off a surface with normal vector 'vectorB'.
 * 
 * @example
 * ```lua
 * vec1 = wl_make_vector(-1,-1,-1)
 * vec2 = wl_make_vector(0,0,1)
 * vec3 = wl_vector_reflect(vec1, vec2)
 * wl_print_vector(vec3)
 * ```
 * This code creates a vector that is reflected off a surface that faces upwards. The resulting reflected vector is printed into the log.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_vector_reflect | View online documentation}
 * @param vectorA - The incident vector.
 * @param vectorB - The normal vector of the surface.
 * @returns The reflected vector.
 */
declare function wl_vector_reflect(vectorA: WLVector, vectorB: WLVector): WLVector;

/**
 * Returns the length of the vector in centimeters.
 * 
 * @example
 * ```lua
 * vec1 = wl_make_vector(1,2,3)
 * length = wl_vector_length(vec1)
 * print(length)
 * ```
 * This code creates a vector, calculates the length and prints the result into the log.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_vector_length | View online documentation}
 * @param vector - The vector whose length is to be calculated.
 * @returns The length of the vector.
 */
declare function wl_vector_length(vector: WLVector): number;

/**
 * Projects 'vectorA' onto 'vectorB' and returns the projected vector.
 * 
 * @example
 * ```lua
 * vec1 = wl_make_vector(1,2,3)
 * vec2 = wl_make_vector(0,0,1)
 * vec3 = wl_vector_project(vec1, vec2)
 * wl_print_vector(vec3)
 * ```
 * This code creates a vector and projects it onto an 'up' vector. In this case that means only the z component of the resulting vector has a value.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_vector_project | View online documentation}
 * @param vectorA - The vector to be projected.
 * @param vectorB - The vector onto which the projection will be performed.
 * @returns The projected vector.
 */
declare function wl_vector_project(vectorA: WLVector, vectorB: WLVector): WLVector;

/**
 * Projects 'vectorA' onto a plane with normal 'vectorB' and returns the projected vector.
 * 
 * @example
 * ```lua
 * vec1 = wl_make_vector(1,2,3)
 * vec2 = wl_make_vector(0,0,1)
 * vec3 = wl_vector_plane_project(vec1, vec2)
 * wl_print_vector(vec3)
 * ```
 * This code creates a vector and projects it onto a surface with an 'up' normal vector. In this case that means only the x and y components of the resulting vector have a value.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_vector_plane_project | View online documentation}
 * @param vectorA - The vector to be projected.
 * @param vectorB - The normal vector of the plane onto which the projection will be performed.
 * @returns The projected vector.
 */
declare function wl_vector_plane_project(vectorA: WLVector, vectorB: WLVector): WLVector;

/**
 * Prints a vector to the log. This is a helper function to aid debugging or visualizing your vectors.
 * 
 * @example
 * ```lua
 * vec = wl_make_vector(1,2,3)
 * wl_print_vector(vec)
 * ```
 * The code creates a vector and prints it directly into the log. The printed string will look as follows: x = 1.000000, y = 2.000000, z = 3.000000
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_print_vector | View online documentation}
 * @param vector - The vector to be printed.
 */
declare function wl_print_vector(vector: WLVector): void;

/**
 * Prints a color to the log. This is a helper function to aid debugging or visualizing your colors.
 * 
 * @example
 * ```lua
 * col = wl_make_color(0.5, 0.24, 0.75, 1.0)
 * wl_print_color(col)
 * ```
 * The code creates a color and prints it directly into the log. The printed string will look as follows: r = 0.500000, g = 0.240000, b = 0.750000, a = 1.000000
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_print_color | View online documentation}
 * @param color - The color to be printed.
 */
declare function wl_print_color(color: WLColor): void;

/**
 * Prints the entire 'table' to the log using json syntax. This is a helper function to aid debugging or visualizing your custom lua tables.
 * 
 * @example
 * ```lua
 * myObj = {}
 * myObj.position = wl_make_vector(1,2,3)
 * myObj.name = "Object name"
 * myObj.value = 512
 * myObj.canEatLemons = true
 * 
 * wl_print_table(myObj)
 * ```
 * This code create a table and gives it arbitrary data. Then, it prints the contents of the table into the log.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_print_table | View online documentation}
 * @param table - The table to be printed.
 */
declare function wl_print_table(table: object): void;

/**
 * Returns the float value of the 'optionID' option of the given 'sandboxObject'.
 * Tip: if you click on the label of an option, it will automatically copy the option ID to the clipboard for you to paste it into your code.
 * 
 * @example
 * ```lua
 * cube = wl_get_object("Cube")
 * optionValue = wl_get_object_float_option(cube, "Specular")
 * print(optionValue)
 * ```
 * This code will retrieve and print the value in the "Specular" option of the first sandbox object named "Cube".
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_float_option | View online documentation}
 * @param sandboxObject - The sandbox object from which to retrieve the option value.
 * @param optionName - The name of the option.
 * @returns The float value of the option.
 */
declare function wl_get_object_float_option(sandboxObject: WLSandboxObject, optionName: string): number;

/**
 * Returns the integer value of the 'optionID' option of the given 'sandboxObject'.
 * Tip: if you click on the label of an option, it will automatically copy the option ID to the clipboard for you to paste it into your code.
 * 
 * @example
 * ```lua
 * cube = wl_get_object("Cube")
 * optionValue = wl_get_object_integer_option(cube, "Material Type")
 * print(optionValue)
 * ```
 * This code will retrieve and print the value in the "Material Type" option of the first sandbox object named "Cube".
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_integer_option | View online documentation}
 * @param sandboxObject - The sandbox object from which to retrieve the option value.
 * @param optionName - The name of the option.
 * @returns The integer value of the option.
 */
declare function wl_get_object_integer_option(sandboxObject: WLSandboxObject, optionName: string): number;

/**
 * Returns the string value of the 'optionID' option of the given 'sandboxObject'.
 * Tip: if you click on the label of an option, it will automatically copy the option ID to the clipboard for you to paste it into your code.
 * 
 * @example
 * ```lua
 * cube = wl_get_object("Cube")
 * optionValue = wl_get_object_integer_option(cube, "MaterialOverride")
 * print(optionValue)
 * ```
 * This code will retrieve and print the value in the "MaterialOverride" option of the first sandbox object named "Cube".
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_string_option | View online documentation}
 * @param sandboxObject - The sandbox object from which to retrieve the option value.
 * @param optionName - The name of the option.
 * @returns The string value of the option.
 */
declare function wl_get_object_string_option(sandboxObject: WLSandboxObject, optionName: string): string;

/**
 * Returns the bool value of the 'optionID' option of the given 'sandboxObject'.
 * Tip: if you click on the label of an option, it will automatically copy the option ID to the clipboard for you to paste it into your code.
 * 
 * @example
 * ```lua
 * cube = wl_get_object("Cube")
 * optionValue = wl_get_object_integer_option(cube, "UseTriplanarMapping")
 * print(optionValue)
 * ```
 * This code will retrieve and print the value in the "UseTriplanarMapping" option of the first sandbox object named "Cube".
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_bool_option | View online documentation}
 * @param sandboxObject - The sandbox object from which to retrieve the option value.
 * @param optionName - The name of the option.
 * @returns The boolean value of the option.
 */
declare function wl_get_object_bool_option(sandboxObject: WLSandboxObject, optionName: string): boolean;

/**
 * Returns the vector value of the 'optionID' option of the given 'sandboxObject'.
 * Tip: if you click on the label of an option, it will automatically copy the option ID to the clipboard for you to paste it into your code.
 * 
 * @example
 * ```lua
 * cube = wl_get_object("Transformer")
 * optionValue = wl_get_object_integer_option(cube, "StartLocation")
 * wl_print_color(optionValue)
 * ```
 * This code will retrieve and print the value in the "StartLocation" option of the first sandbox object named "Transformer".
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_vector_option | View online documentation}
 * @param sandboxObject - The sandbox object from which to retrieve the option value.
 * @param optionName - The name of the option.
 * @returns The vector value of the option.
 */
declare function wl_get_object_vector_option(sandboxObject: WLSandboxObject, optionName: string): WLVector;

/**
 * Returns the color value of the 'optionID' option of the given 'sandboxObject'.
 * Tip: if you click on the label of an option, it will automatically copy the option ID to the clipboard for you to paste it into your code.
 * 
 * @example
 * ```lua
 * cube = wl_get_object("Cube")
 * optionValue = wl_get_object_integer_option(cube, "Color")
 * wl_print_vector(optionValue)
 * ```
 * This code will retrieve and print the value in the "Color" option of the first sandbox object named "Cube".
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_color_option | View online documentation}
 * @param sandboxObject - The sandbox object from which to retrieve the option value.
 * @param optionName - The name of the option.
 * @returns The color value of the option.
 */
declare function wl_get_object_color_option(sandboxObject: WLSandboxObject, optionName: string): WLColor;

/**
 * Sets the float value of the 'optionID' option of the given 'sandboxObject'.
 * Tip: if you click on the label of an option, it will automatically copy the option ID to the clipboard for you to paste it into your code.
 * 
 * @example
 * ```lua
 * cube = wl_get_object("Cube")
 * wl_set_object_float_option(cube, "Specular", 0.5)
 * ```
 * This code will set the value in the "Specular" option of the first sandbox object named "Cube" to 0.5.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_set_object_float_option | View online documentation}
 * @param sandboxObject - The sandbox object for which to set the option value.
 * @param optionName - The name of the option.
 * @param optionValue - The value to set for the option.
 */
declare function wl_set_object_float_option(sandboxObject: WLSandboxObject, optionName: string, optionValue: WLValue): void;

/**
 * Sets the integer value of the 'optionID' option of the given 'sandboxObject'.
 * Tip: if you click on the label of an option, it will automatically copy the option ID to the clipboard for you to paste it into your code.
 * 
 * @example
 * ```lua
 * cube = wl_get_object("Cube")
 * wl_set_object_integer_option(cube, "Material Type", 3)
 * ```
 * This code will set the value in the "Material Type" option of the first sandbox object named "Cube" to 3.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_set_object_integer_option | View online documentation}
 * @param sandboxObject - The sandbox object for which to set the option value.
 * @param optionName - The name of the option.
 * @param optionValue - The value to set for the option.
 */
declare function wl_set_object_integer_option(sandboxObject: WLSandboxObject, optionName: string, optionValue: WLValue): void;

/**
 * Sets the string value of the 'optionID' option of the given 'sandboxObject'.
 * Tip: if you click on the label of an option, it will automatically copy the option ID to the clipboard for you to paste it into your code.
 * 
 * @example
 * ```lua
 * cube = wl_get_object("Cube")
 * wl_set_object_integer_option(cube, "MaterialOverride", "MyMaterial")
 * ```
 * This code will set the value in the "MaterialOverride" option of the first sandbox object named "Cube" to "MyMaterial".
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_set_object_string_option | View online documentation}
 * @param sandboxObject - The sandbox object for which to set the option value.
 * @param optionName - The name of the option.
 * @param optionValue - The value to set for the option.
 */
declare function wl_set_object_string_option(sandboxObject: WLSandboxObject, optionName: string, optionValue: WLValue): void;

/**
 * Sets the bool value of the 'optionID' option of the given 'sandboxObject'.
 * Tip: if you click on the label of an option, it will automatically copy the option ID to the clipboard for you to paste it into your code.
 * 
 * @example
 * ```lua
 * cube = wl_get_object("Cube")
 * wl_set_object_integer_option(cube, "UseTriplanarMapping", true)
 * ```
 * This code will set the value in the "UseTriplanarMapping" option of the first sandbox object named "Cube" to true.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_set_object_bool_option | View online documentation}
 * @param sandboxObject - The sandbox object for which to set the option value.
 * @param optionName - The name of the option.
 * @param optionValue - The value to set for the option.
 */
declare function wl_set_object_bool_option(sandboxObject: WLSandboxObject, optionName: string, optionValue: WLValue): void;

/**
 * Sets the vector value of the 'optionID' option of the given 'sandboxObject'.
 * Tip: if you click on the label of an option, it will automatically copy the option ID to the clipboard for you to paste it into your code.
 * 
 * @example
 * ```lua
 * cube = wl_get_object("Transformer")
 * wl_set_object_integer_option(cube, "StartLocation", wl_make_vector(1.0, 2.0, 3.0))
 * ```
 * This code will set the value in the "StartLocation" option of the first sandbox object named "Transformer" to x=1.0, y=2.0, z=3.0.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_set_object_vector_option | View online documentation}
 * @param sandboxObject - The sandbox object for which to set the option value.
 * @param optionName - The name of the option.
 * @param optionValue - The value to set for the option.
 */
declare function wl_set_object_vector_option(sandboxObject: WLSandboxObject, optionName: string, optionValue: WLValue): void;

/**
 * Sets the color value of the 'optionID' option of the given 'sandboxObject'.
 * Tip: if you click on the label of an option, it will automatically copy the option ID to the clipboard for you to paste it into your code.
 * 
 * @example
 * ```lua
 * cube = wl_get_object("Cube")
 * wl_set_object_integer_option(cube, "Color", wl_make_color(0.0, 1.0, 0.0, 1.0))
 * ```
 * This code will set the value in the "Color" option of the first sandbox object named "Cube" to green.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_set_object_color_option | View online documentation}
 * @param sandboxObject - The sandbox object for which to set the option value.
 * @param optionName - The name of the option.
 * @param optionValue - The value to set for the option.
 */
declare function wl_set_object_color_option(sandboxObject: WLSandboxObject, optionName: string, optionValue: WLValue): void;

/**
 * Returns the object parent of the given 'sandboxObject'.
 * 
 * @example
 * ```lua
 * cube = wl_get_object("Cube")
 * cube_parent = wl_get_object_parent(cube)
 * print(wl_get_object_name(cube_parent))
 * ```
 * This code gets the first object named "Cube", accesses it's parent and saves it into the cube_parent variable. Then, the parent's name is printed to the log.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_parent | View online documentation}
 * @param sandboxObject - The sandbox object for which to retrieve the parent.
 * @returns The parent object of the sandbox object.
 */
declare function wl_get_object_parent(sandboxObject: WLSandboxObject): WLSandboxObject;

/**
 * Returns the object parent of the currently executing Lua prop.
 * 
 * @example
 * ```lua
 * lua_parent = wl_get_object_self_parent()
 * print(wl_get_object_name())
 * ```
 * This code prints the name of the parent of the currently executing Lua prop to the log.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_self_parent | View online documentation}
 * @returns The parent object of the currently executing Lua prop.
 */
declare function wl_get_object_self_parent(): WLSandboxObject;

/**
 * Returns an array of all the direct children the 'sandboxObject' has. If you also want to retrieve children of children, use wl_get_object_children_recursive instead.
 * Caution: Lua arrays are 1-indexed, meaning the first element of an array is in array[1] and not in array[0].
 * 
 * @example
 * ```lua
 * cube = wl_get_object("Cube")
 * cube_children = wl_get_object_children(cube)
 * 
 * for i = 1, #cube_children do
 *     print(wl_get_object_name(cube_children[i]))
 * end
 * ```
 * This code retrieves all direct children of the first object named "Cube" and prints each of their names into the log.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_children | View online documentation}
 * @param sandboxObject - The sandbox object for which to retrieve the children.
 * @returns An array of sandbox objects that are the direct children of the specified object.
 */
declare function wl_get_object_children(sandboxObject: WLSandboxObject): WLSandboxObject[];

/**
 * Returns an array of all the direct children the currently executing Lua prop has. If you also want to retrieve children of children, use wl_get_object_self_children_recursive instead.
 * Caution: Lua arrays are 1-indexed, meaning the first element of an array is in array[1] and not in array[0].
 * 
 * @example
 * ```lua
 * cube = wl_get_object("Cube")
 * lua_children = wl_get_object_self_children(cube)
 * 
 * for i = 1, #lua_children do
 *     print(wl_get_object_name(lua_children[i]))
 * end
 * ```
 * This code retrieves all direct children of the currently executing Lua prop and prints each of their names into the log.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_self_children | View online documentation}
 * @returns An array of SandboxObject representing the children of the current Lua prop.
 */
declare function wl_get_object_self_children(): WLSandboxObject[];

/**
 * Returns an array of all the children the 'sandboxObject' has. If you only want to retrieve the direct children of the object, use wl_get_object_children instead.
 * Caution: Lua arrays are 1-indexed, meaning the first element of an array is in array[1] and not in array[0].
 * 
 * @example
 * ```lua
 * cube = wl_get_object("Cube")
 * cube_children = wl_get_object_children_recursive(cube)
 * 
 * for i = 1, #cube_children do
 *     print(wl_get_object_name(cube_children[i]))
 * end
 * ```
 * This code retrieves all children of the first object named "Cube" and prints each of their names into the log.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_children_recursive | View online documentation}
 * @param sandboxObject The sandbox object whose children to retrieve.
 * @returns An array of SandboxObject representing the recursive children of the specified object.
 */
declare function wl_get_object_children_recursive(sandboxObject: WLSandboxObject): WLSandboxObject[];

/**
 * Returns an array of all the children the currently executing Lua prop has. If you only want to retrieve the direct children of the object, use wl_get_object_self_children instead.
 * Caution: Lua arrays are 1-indexed, meaning the first element of an array is in array[1] and not in array[0].
 * 
 * @example
 * ```lua
 * cube = wl_get_object("Cube")
 * lua_children = wl_get_object_self_children_recursive(cube)
 * 
 * for i = 1, #lua_children do
 *     print(wl_get_object_name(lua_children[i]))
 * end
 * ```
 * This code retrieves all children of the currently executing Lua prop and prints each of their names into the log.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_self_children_recursive | View online documentation}
 * @returns An array of SandboxObject representing the recursive children of the current Lua prop.
 */
declare function wl_get_object_self_children_recursive(): WLSandboxObject[];

/**
 * Similar to wl_get_object, but instead of returning the first instance of a sandbox object named 'objectName', it will instead return an array of all sandbox objects with that name.
 * Caution: Lua arrays are 1-indexed, meaning the first element of an array is in array[1] and not in array[0]
 * 
 * @example
 * ```lua
 * cubes = wl_get_objects("Cube")
 * 
 * for i = 1, #cubes do
 *     print(cubes[i])
 * end
 * ```
 * This code retrieves an array of all sandbox objects named "Cube" and prints their IDs into the log.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_objects | View online documentation}
 * @param objectName The name of the sandbox objects to retrieve.
 * @returns An array of SandboxObject with the specified name.
 */
declare function wl_get_objects(objectName: string): WLSandboxObject[];

/**
 * Adds an event to an event dispatcher on 'sandboxObject'. The 'dispatcherID' is the ID of the dispatcher you want to add the event to.
 * Tip: if you click on the label of a dispatcher, it will automatically copy the dispatcher ID to the clipboard for you to paste it into your code.
 * 
 * @example
 * ```lua
 * button = wl_get_object("Button")
 * wl_add_event_to_dispatcher(button, "OnButtonDown", "SetCubeVisibilityOn", "true")
 * ```
 * This code adds an event to the "OnButtonDown" dispatcher on the first sandbox object named "Button".
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_add_event_to_dispatcher | View online documentation}
 * @param sandboxObject The sandbox object to which the event will be added.
 * @param dispatcherID The ID of the dispatcher to add the event to.
 * @param eventName The name of the event to add.
 * @param eventValue The value of the event to add.
 */
declare function wl_add_event_to_dispatcher(sandboxObject: WLSandboxObject, dispatcherID: string, eventName: string, eventValue: WLValue): void;

/**
 * Removes an event from an event dispatcher on 'sandboxObject'. The 'dispatcherID' is the ID of the dispatcher you want to remove the event from.
 * Tip: if you click on the label of a dispatcher, it will automatically copy the dispatcher ID to the clipboard for you to paste it into your code.
 * 
 * @example
 * ```lua
 * button = wl_get_object("Button")
 * wl_remove_event_from_dispatcher(cube, "OnButtonDown", "SetCubeVisibilityOn")
 * ```
 * This code removes an event called "SetCubeVisibilityOn" from the "OnButtonDown" dispatcher on the first sandbox object named "Button"
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_remove_event_from_dispatcher | View online documentation}
 * @param sandboxObject The sandbox object from which to remove the event.
 * @param dispatcherID The ID of the dispatcher to remove the event from.
 * @param eventName The name of the event to remove.
 */
declare function wl_remove_event_from_dispatcher(sandboxObject: WLSandboxObject, dispatcherID: string, eventName: string): void;

/**
 * Adds an event to an event receiver on 'sandboxObject'. The 'receiverID' is the ID of the receiver you want to add the event to.
 * Tip: if you click on the label of a receiver, it will automatically copy the receiver ID to the clipboard for you to paste it into your code.
 * 
 * @example
 * ```lua
 * cube = wl_get_object("Cube")
 * wl_add_event_to_receiver(cube, "SetVisibility", "SetCubeVisibilityOn", "true")
 * ```
 * This code adds an event to the "SetVisibility" receiver on the first sandbox object named "Cube".
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_add_event_to_receiver | View online documentation}
 * @param sandboxObject The sandbox object to which the event will be added.
 * @param receiverID The ID of the receiver to add the event to.
 * @param eventName The name of the event to add.
 * @param eventValue The value of the event to add.
 */
declare function wl_add_event_to_receiver(sandboxObject: WLSandboxObject, receiverID: string, eventName: string, eventValue: WLValue): void;

/**
 * Removes an event from an event receiver on 'sandboxObject'. The 'receiverID' is the ID of the receiver you want to remove the event from.
 * Tip: if you click on the label of a receiver, it will automatically copy the receiver ID to the clipboard for you to paste it into your code.
 * 
 * @example
 * ```lua
 * cube = wl_get_object("Cube")
 * wl_remove_event_from_receiver(cube, "SetVisibility", "SetCubeVisibilityOn")
 * ```
 * This code removes an event called "SetCubeVisibilityOn" from the "SetVisibility" receiver on the first sandbox object named "Cube"
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_remove_event_from_receiver | View online documentation}
 * @param sandboxObject The sandbox object from which to remove the event.
 * @param receiverID The ID of the receiver to remove the event from.
 * @param eventName The name of the event to remove.
 */
declare function wl_remove_event_from_receiver(sandboxObject: WLSandboxObject, receiverID: string, eventName: string): void;

/**
 * Returns whether the given 'sandboxObject' is currently visible or not.
 * 
 * @example
 * ```lua
 * cube = wl_get_object("Cube")
 * is_visible = wl_get_object_visibility(cube)
 * print(is_visible)
 * ```
 * This code will get the first object named "Cube" and print whether it's visible or not into the log.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_visibility | View online documentation}
 * @param sandboxObject The sandbox object to check visibility for.
 * @returns True if the object is visible, otherwise false.
 */
declare function wl_get_object_visibility(sandboxObject: WLSandboxObject): boolean;

/**
 * This function can be used to set the visibility of the given 'sandboxObject' to the value of 'newVisibility'
 * 
 * @example
 * ```lua
 * cube = wl_get_object("Cube")
 * wl_set_object_visibility(cube, true)
 * ```
 * This code will set the first object named "Cube" to be visible.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_set_object_visibility | View online documentation}
 * @param sandboxObject The sandbox object to set visibility for.
 * @param newVisibility The new visibility value to set.
 */
declare function wl_set_object_visibility(sandboxObject: WLSandboxObject, newVisibility: boolean): void;

/**
 * Returns whether the given 'sandboxObject' has it's event dispatchers enabled or not.
 * 
 * @example
 * ```lua
 * button = wl_get_object("Button")
 * is_enabled = wl_get_object_dispatchers_enabled(button)
 * print(is_enabled)
 * ```
 * This code will print whether the first object named "Button" has it's event dispatchers enabled or not.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_dispatchers_enabled | View online documentation}
 * @param sandboxObject The sandbox object to check dispatchers for.
 * @returns True if the dispatchers are enabled, otherwise false.
 */
declare function wl_get_object_dispatchers_enabled(sandboxObject: WLSandboxObject): boolean;

/**
 * This function can be used to enable or disable the event dispatchers of the given 'sandboxObject'.
 * 
 * @example
 * ```lua
 * button = wl_get_object("Button")
 * wl_set_object_dispatchers_enabled(button, false)
 * ```
 * This code will disable the event dispatchers on the first sandbox object named "Button".
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_set_object_dispatchers_enabled | View online documentation}
 * @param sandboxObject The sandbox object to set dispatchers for.
 * @param newEnabled The new enabled value to set.
 */
declare function wl_set_object_dispatchers_enabled(sandboxObject: WLSandboxObject, newEnabled: boolean): void;

/**
 * Returns whether the given 'sandboxObject' has it's event receivers enabled or not.
 * 
 * @example
 * ```lua
 * cube = wl_get_object("Cube")
 * is_enabled = wl_get_object_receivers_enabled(cube)
 * print(is_enabled)
 * ```
 * This code will print whether the first object named "Cube" has it's event receivers enabled or not.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_get_object_receivers_enabled | View online documentation}
 * @param sandboxObject The sandbox object to check receivers for.
 * @returns True if the receivers are enabled, otherwise false.
 */
declare function wl_get_object_receivers_enabled(sandboxObject: WLSandboxObject): boolean;

/**
 * This function can be used to enable or disable the event receivers of the given 'sandboxObject'.
 * 
 * @example
 * ```lua
 * cube = wl_get_object("Cube")
 * wl_set_object_receivers_enabled(cube, false)
 * ```
 * This code will disable the event receivers on the first sandbox object named "Cube".
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_set_object_receivers_enabled | View online documentation}
 * @param sandboxObject The sandbox object to set receivers for.
 * @param newEnabled The new enabled value to set.
 */
declare function wl_set_object_receivers_enabled(sandboxObject: WLSandboxObject, newEnabled: boolean): void;

/**
 * This function can be used to execute lua code at a later point in time. As the name suggests, the 'delaySeconds' parameter defines the amount of seconds to wait until executing the code in 'luaCodeString'.
 * 
 * @example
 * ```lua
 * function print_something(text_to_print)
 *     print(text_to_print)
 * end
 * 
 * wl_execute_delayed(2.0, "print_something('Hello world!')")
 * ```
 * This code defines a function to print something into the log and then executes it with a 2 second delay.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_execute_delayed | View online documentation}
 * @param delaySeconds The delay in seconds before executing the Lua code.
 * @param luaCodeString The Lua code to execute.
 */
declare function wl_execute_delayed(delaySeconds: number, luaCodeString: string): void;

/**
 * This function can be used to save custom data onto the hard drive for later use. The save location will always be in the "%localappdata%/WildLifeC/Saved/SandboxSaveGames/CustomSaves/" folder.
 * Of course, having the power to save any amount of data needs to be restricted for security purposes, so saving data has the following limitations:
 * The file name may only contain characters a-z, A-Z and 0-9
 * The saved data may not exceed 1MB
 * You are only allowed 10 separate file names before the sandbox will block any new files being created. You can reset the block by resetting the lua state (Trash icon in the lua editor, this will also clean all globally defined functions and variables).
 * You can save both single values as well as tables using this function. If you require a lot of values to be saved, it is recommended to create a save structure lua table containing all the values you want to save. Tables are saved as json strings. Also, make sure to use unique file names so that they don't clash with other creators' scenes, since all custom save files share the same folder.
 * 
 * @example
 * ```lua
 * saveData = {}
 * saveData.playerPosition = wl_make_vector(1,2,3)
 * saveData.playerName = "Hans"
 * saveData.playerMoney = 69420
 * saveData.playerHasSeenIntro = true
 * saveData.enemiesDefeated = 24
 * saveData.deaths = 3
 * 
 * wl_data_save(saveData, "MySceneNameSaveData")
 * ```
 * This code creates a table with arbitrary data we want to save and then saves it to file file named "MySceneNameSaveData".
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_data_save | View online documentation}
 * @param data The custom data to be saved.
 * @param fileName The name of the file to save the data to.
 * @returns True if the data was successfully saved, otherwise false.
 */
declare function wl_data_save(data: JsonData, fileName: string): boolean;

/**
 * This function allows you to load save data from the "%localappdata%/WildLifeC/Saved/SandboxSaveGames/CustomSaves/" folder. If the file failed to load, the function will return 'nil' instead.
 * Loading files has the following limitations:
 * The file name may only contain characters a-z, A-Z and 0-9
 * 
 * @example
 * ```lua
 * loadedData = wl_data_load("MySceneNameSaveData")
 * if (loadedData ~= nil) then
 *     wl_print_table(loadedData)
 * end
 * ```
 * This code will try to load a file named "MySceneNameSaveData", and if it didn't return 'nil', it will be printed into the log.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_data_load | View online documentation}
 * @param fileName The name of the file to load the data from.
 * @returns The loaded data as a JSON object, or null if loading failed.
 */
declare function wl_data_load(fileName: string): JsonData;

/**
 * This functions allows you to delete a save file in the "%localappdata%/WildLifeC/Saved/SandboxSaveGames/CustomSaves/" folder. It will return either 'true' or 'false', depending on the success or failure of the deletion.
 * Deleting files has the following limitations:
 * The file name may only contain characters a-z, A-Z and 0-9
 * 
 * @example
 * ```lua
 * if (wl_data_delete("MySceneNameSaveData") == true) then
 *     print("File was deleted successfully!")
 * else
 *     print("File could not be deleted!")
 * end
 * ```
 * This code tries to delete a file named "MySceneNameSaveData" and prints to the log whether it was successful or not.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_data_delete | View online documentation}
 * @param fileName The name of the file to delete.
 * @returns True if the file was successfully deleted, otherwise false.
 */
declare function wl_data_delete(fileName: string): boolean;

/**
 * This function allows you to check whether a save file exists before trying to load, save or delete it.
 * Checking files has the following limitations:
 * The file name may only contain characters a-z, A-Z and 0-9
 * 
 * @example
 * ```lua
 * if (wl_data_exists("MySceneNameSaveData") == true) then
 *     print("File exists! :)")
 * else
 *     print("File doesn't exist! :(")
 * end
 * ```
 * This code tries to find a file named "MySceneNameSaveData" and prints to the log whether it exists or not.
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_data_exists | View online documentation}
 * @param fileName The name of the file to check.
 * @returns True if the file exists, otherwise false.
 */
declare function wl_data_exists(fileName: string): boolean;

/**
 * This function allows you to load another sandbox scene. The scene needs to be compatible with the current level, for example, a Showroom map could not be loaded while in the Wild Life map. Only the scene name needs to be specified (without the .json extension).
 * You can specify whether the loaded scene should be loaded by itself or additively using the second function parameter.
 * Returns true or false, depending on the success of the load.
 * This function is experimental and could lead to a multitude of unexpected edge cases. Before running this function, make sure all necessary scenes and code are saved to prevent any data loss. It is also recommended to not load multiple scenes at the same time, both additively and not. Any code that follows this function could lead to unexpected behaviour and should be avoided.
 * 
 * @example
 * ```lua
 * -- Loads a scene by itself, overwriting anything currently in the sandbox.
 * wl_load_scene("My Scene", false)
 * 
 * -- Alternatively: Loads a scene additively to the current sandbox scene.
 * wl_load_scene("My Scene", true)
 * ```
 * This code tries to open a scene named "My Scene".
 * 
 * 
 * {@link https://wildlife.adult/Documentation/Lua/v1/WildLifeLuaDocumentation.html#wl_load_scene | View online documentation}
 * @param sceneName The name of the scene to load.
 * @param loadAdditively Whether to load the scene additively or not.
 * @returns True if the scene was successfully loaded, otherwise false.
 */
declare function wl_load_scene(sceneName: string, loadAdditively: boolean): boolean;