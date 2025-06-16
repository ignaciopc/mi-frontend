<template>
  <header class="navbar navbar-expand-lg navbar-dark bg-success px-4 py-3 rounded shadow mx-auto mt-3"
    style="width: 80%;">
    <div class="container-fluid">
      <template v-if="isAuthenticated">
        <router-link class="navbar-brand fw-bold" to="/home">Inicio</router-link>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
          <ul class="navbar-nav gap-2">
            <!-- Fincas -->
            <li class="nav-item">
              <router-link to="/home" class="nav-link">Inicio</router-link>
            </li>
            <li class="nav-item dropdown">
              <button class="nav-link dropdown-toggle btn btn-link" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Fincas
              </button>
              <ul class="dropdown-menu">
                <li><router-link to="/fincas/lista" class="dropdown-item">Lista de Fincas</router-link></li>
                <li><router-link to="/fincas/mapa" class="dropdown-item">Mapa Interactivo</router-link></li>
                <li v-if="usuarioActual?.rol !== 'trabajador'"><router-link to="/fincas/crear"
                    class="dropdown-item">Agregar Nueva Finca</router-link></li>
              </ul>
            </li>

            <!-- Tareas -->
            <li class="nav-item dropdown">
              <button class="nav-link dropdown-toggle btn btn-link" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Tareas y Proyectos
              </button>
              <ul class="dropdown-menu">
                <li><router-link to="/tareas/lista" class="dropdown-item">Lista de Tareas</router-link></li>
                <li><router-link to="/tareas/calendario" class="dropdown-item">Calendario de Actividades</router-link>
                </li>
              </ul>
            </li>

            <!-- Finanzas -->
            <li class="nav-item dropdown" v-if="usuarioActual?.rol !== 'trabajador'">
              <button class="nav-link dropdown-toggle btn btn-link" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Finanzas
              </button>
              <ul class="dropdown-menu">
                <li><router-link to="/finanzas/resumen" class="dropdown-item">Resumen de Finanzas</router-link></li>
              </ul>
            </li>

            <!-- Usuarios -->
            <li class="nav-item dropdown" v-if="usuarioActual?.rol !== 'trabajador'">
              <button class="nav-link dropdown-toggle btn btn-link" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Usuarios y Roles
              </button>
              <ul class="dropdown-menu">
                <li><router-link to="/usuarios/lista" class="dropdown-item">Lista de Usuarios</router-link></li>
                <li><router-link to="/usuarios/roles" class="dropdown-item">Creacion de trabajadores</router-link></li>
              </ul>
            </li>

            <!-- Documentos -->
            <li v-if="usuarioActual?.rol !== 'trabajador'" class="nav-item dropdown">
              <button class="nav-link dropdown-toggle btn btn-link" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Documentos
              </button>
              <ul class="dropdown-menu">
                <li><router-link to="/documentos/generar" class="dropdown-item">Gestión de Documentos</router-link></li>
              </ul>
            </li>

            <!-- Cuenta -->
            <li class="nav-item">
              <router-link to="/cuenta" class="nav-link">Cuenta</router-link>
            </li>

          </ul>
        </div>
      </template>

      <template v-else>
        <!-- Solo mostrar link a /session cuando NO está autenticado -->
        <router-link class="navbar-brand fw-bold" to="/session">Iniciar Sesión</router-link>
      </template>
    </div>
  </header>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const isAuthenticated = ref(false)
const usuarioActual = ref(null)
const loading = ref(true)  // nuevo estado de carga
const route = useRoute()

async function checkAuthentication() {
  loading.value = true
  const token = localStorage.getItem('token')
  if (!token) {
    isAuthenticated.value = false
    usuarioActual.value = null
    loading.value = false
    console.log('isAuthenticated:', isAuthenticated.value) // <-- Aquí
    return
  }

  try {
    const res = await fetch(`${API_URL}/api/usuarios/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    if (!res.ok) throw new Error('Token inválido o expirado')

    usuarioActual.value = await res.json()
    isAuthenticated.value = true
  } catch (error) {
    console.error('Error autenticando usuario:', error)
    localStorage.removeItem('token')
    usuarioActual.value = null
    isAuthenticated.value = false
  } finally {
    loading.value = false
    console.log('isAuthenticated:', isAuthenticated.value) // <-- Y aquí también para cubrir todos los casos
  }
}

onMounted(() => {
  checkAuthentication()
})

watch(route, () => {
  checkAuthentication()
})
</script>
