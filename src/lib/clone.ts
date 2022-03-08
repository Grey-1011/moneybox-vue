function clone<T>(data: T): T { // data 什么类型 返回什么类型  <T>意为声明 T
    return JSON.parse(JSON.stringify(data));
}

export default clone;