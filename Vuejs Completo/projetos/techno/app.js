const vm = new Vue({
  el: "#app",
  data: {
    products: {},
  },
  filters: {
    formatPrice(v) {
      return v.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
  },
  methods: {
    fetchProducts() {
      fetch("./api/produtos.json")
        .then((r) => r.json())
        .then((r) => {
          this.products = r;
        });
    },
  },
  created() {
    this.fetchProducts();
  },
});
