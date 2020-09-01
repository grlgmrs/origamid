const vm = new Vue({
  el: "#app",
  data: {
    products: {},
    product: false,
    cart: [],
  },
  filters: {
    formatPrice(v) {
      return v.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
  },
  computed: {
    totalCart() {
      let total = this.cart.reduce((total, current) => total + current.preco, 0);

      return total;
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
    addToCart() {
      if (this.product.estoque > 0) {
        this.product.estoque--;

        const { id, nome, preco } = this.product;

        this.cart.push({ id, nome, preco });
      }
    },
    removeFromCart(index) {
      this.cart.splice(index, 1);
    },
  },
  created() {
    this.fetchProducts();
  },
});
