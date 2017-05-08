namespace ns.one {
  export class NamespacedClass {
    x: NamespacedClass;
    y: ns.two.NamespacedClass;
  }
}

namespace ns.two {
  export class NamespacedClass {
    x: ns.one.NamespacedClass;
    y: NamespacedClass;
  }
}
