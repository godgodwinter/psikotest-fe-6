<script setup></script>
<template>
  <div class="w-full">
    <!-- <span>Logo</span> > <span>Menu Utama</span> > <span>Submenu</span> -->
    <div class="text-sm breadcrumbs px-4 py-0">
      <ul>
        <li>
          <router-link :to="{ name: 'AdminDashboard' }">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="w-4 h-4 mr-2 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              ></path></svg
          ></router-link>
        </li>

        <slot name="content">
          <li><a href="#">Menu</a></li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </li>
          <li><a href="Link">Sub Menu</a></li>
        </slot>
      </ul>
    </div>
  </div>
</template>
