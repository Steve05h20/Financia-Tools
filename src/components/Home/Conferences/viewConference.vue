<script lang="ts" setup>
import { dataConferences } from './dataConferences'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCalendarAlt,
  faClock,
  faMapMarkerAlt,
  faInfoCircle,
  faCalendarPlus,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Ajouter les icônes à la bibliothèque
library.add(faCalendarAlt, faClock, faMapMarkerAlt, faInfoCircle, faCalendarPlus)

const { texts, images } = dataConferences

interface EventConference {
  id: number
  title: string
  date: string
  time: string
  location: string
  description: string
}

const formatGoogleCalendarDate = (date: string, time: string) => {
  const formattedDate =
    new Date(`${date}T${time}`).toISOString().replace(/[-:.]/g, '').slice(0, 15) + 'Z'
  return formattedDate
}

const getGoogleCalendarLink = (event: EventConference) => {
  const startDate = formatGoogleCalendarDate(event.date, event.time)
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate}/${startDate}&details=${encodeURIComponent(event.description)}`
}

const getOutlookCalendarLink = (event: EventConference) => {
  const startDate = new Date(`${event.date}T${event.time}`).toISOString()
  return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(event.title)}&startdt=${startDate}&enddt=${startDate}&location=${encodeURIComponent(event.location)}&body=${encodeURIComponent(event.description)}`
}

// Fonction pour formater la date en français
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

// Fonction pour formater l'heure
const formatTime = (timeString: string) => {
  return timeString.replace(/(\d{1,2})(\d{2})/, '$1h$2')
}
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="container mx-auto px-4 py-12 lg:py-20">
      <div class="flex flex-col items-center gap-8 lg:gap-10 ">
        <!-- Contenu principal (titre, texte et cartes) - 60% -->
        <div class=" w-full flex flex-col order-2 lg:order-1">
          <!-- Titre et description -->
          <div class="mb-6 lg:mb-8">
            <h1 class="text-4xl text-center md:text-5xl lg:text-6xl font-bold text-primary mb-4 leading-tight">
              {{ texts.title }}
            </h1>
            <p class="text-lg md:text-2xl font-semibold text-gray-600 text-center max-lg:w-2/3 mx-auto">
              {{ texts.description }}
            </p>
          </div>

          <!-- Cartes d'événements - 3 colonnes -->
          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 flex-grow">
            <div
              v-for="event in dataConferences.events"
              :key="event.id"
              class="card bg-white shadow-lg border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
            >
              <div class="card-body p-5 text-gray-800 flex flex-col h-full">
                <div class="flex-grow ">
                  <h3 class="card-title text-xl font-bold text-primary h-24 mb-4">{{ event.title }}</h3>

                  <!-- Date et heure -->
                  <div class="flex items-center text-gray-600 mb-2 text-sm">
                    <font-awesome-icon :icon="['fas', 'calendar-alt']" class="mr-2 w-3" />
                    <span>{{ formatDate(event.date) }} • {{ formatTime(event.time) }}</span>
                  </div>

                  <!-- Lieu -->
                  <div class="flex items-center text-gray-600 mb-3 text-sm">
                    <font-awesome-icon :icon="['fas', 'map-marker-alt']" class="mr-2 w-3" />
                    <span>{{ event.location }}</span>
                  </div>

                  <!-- Description -->
                  <div class="flex text-gray-700 mb-4 text-sm">
                    <font-awesome-icon
                      :icon="['fas', 'info-circle']"
                      class="mr-2 mt-0.5 flex-shrink-0 w-3"
                    />
                    <p class="line-clamp-3">{{ event.description }}</p>
                  </div>
                </div>

                <!-- Bouton -->
                <div class="mt-auto">
                  <details class="dropdown w-full">
                    <summary class="btn btn-primary w-full py-2 text-sm">
                      <font-awesome-icon :icon="['fas', 'calendar-plus']" class="mr-2" />
                      Je participe
                    </summary>
                    <ul
                      class="dropdown-content menu p-2 shadow bg-white rounded-box w-full border border-gray-200 mt-1"
                    >
                      <li>
                        <a
                          :href="getGoogleCalendarLink(event)"
                          target="_blank"
                          class="text-gray-700 hover:bg-gray-100 text-sm"
                        >
                          Google Agenda
                        </a>
                      </li>
                      <li>
                        <a
                          :href="getOutlookCalendarLink(event)"
                          target="_blank"
                          class="text-gray-700 hover:bg-gray-100 text-sm"
                        >
                          Outlook
                        </a>
                      </li>
                    </ul>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Image à droite - 40% -->
        <div class=" w-full lg:order-2 lg:pl-4 order-1 ">
          <div class="w-full h-auto max-h-[600px] object-contain rounded-xl shadow-xl">
            <img
              :src="images.imageConferences.url"
              :alt="images.imageConferences.alt"
              class="w-full h-full lg:h-58 rounded-xl shadow-xl object-cover lg:object-center"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

