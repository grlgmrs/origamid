const vm = new Vue({
  el: "#app",
  data: {
    products: {},
    product: false,
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
    fetchProduct(id) {
      fetch(`./api/produtos/${id}/dados.json`)
        .then((r) => r.json())
        .then((r) => {
          this.product = r;
        });
    },
    closeModal() {
      this.product = false;
    },
    openModal(id) {
      this.fetchProduct(id);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  created() {
    this.fetchProducts();
  },
});
