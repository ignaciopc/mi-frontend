<template>
  <footer class="bg-light text-center text-muted py-4 border-top mt-auto">
    <div class="container">
      <!-- Logotipo -->
      <img src="/icon-192.png" alt="Logotipo olivo" width="40" height="40" class="mb-2" />

      <!-- Texto -->
      <p class="mb-1">© 2025 Ignacio Palomar Chacón</p>
      <p class="mb-2 small">
        Aplicación web para la gestión integral de fincas olivareras.
      </p>

      <!-- Enlaces -->
      <div class="d-flex justify-content-center gap-3 small">
<a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=ignaciopalomarchacon@gmail.com&su=Consulta%20sobre%20la%20app&body=Hola%20Ignacio,%0Aquiero%20hacer%20una%20consulta..."
  target="_blank"
  rel="noopener noreferrer"
  class="text-muted text-decoration-none"
>
  Contacto
</a>        <a href="https://github.com/ignaciopc" target="_blank" class="text-muted text-decoration-none">GitHub</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No hay lógica necesaria por ahora
</script>

<style scoped>
footer img {
  filter: grayscale(100%) opacity(70%);
}
</style>
