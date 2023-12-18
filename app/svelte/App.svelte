<script lang="ts">
  import routes from "./routes";
  import Router from "svelte-spa-router";
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
</script>

<Header />
<main>
  <Router {routes} />
</main>
<Footer />
<style>
</style>