<template>
  <div>
    <div class="part">
      <h1>Test Assignment SquareGPS</h1>
      <p>
        Using <b>Vue.js, Vuex, VueRouter, Vuetify</b>, create an application.
        The application header should contain a menu with 2 items:
        <b>About the Assignment</b> and <b>Map</b>. The main part of the
        application should display the content of the sections.
      </p>
    </div>
    <div class="part">
      <h2>Section "About the Assignment"</h2>
      <p>
        The section should contain the text of this assignment, styled
        similarly.
      </p>
    </div>
    <div class="part">
      <h2>Section "Map"</h2>
      <p>The screen should display a map and a list (see example):</p>
      <ol>
        <li>
          When clicking the add button, the map should switch to marker addition
          mode: a marker should appear at the click location, and an entry with
          the point's address should appear in the list.
        </li>
        <ol>
          <li>
            To find the address, you can use any free geocoding API, for
            example:
            <a href="https://geocode.maps.co" target="_blank"
              >https://geocode.maps.co.</a
            >
          </li>
          <li>
            If the address is not found, an error should be displayed and the
            marker should not be added to the list.
          </li>
        </ol>
        <li>
          When clicking on a marker, the corresponding entry in the list should
          be highlighted.
        </li>
        <li>
          When clicking on an entry in the list, the map should center on the
          marker.
        </li>
        <li>
          Markers should be stored locally and should not disappear after
          refreshing the page.
        </li>
        <li>
          The selected marker's id should be displayed in the address bar.
        </li>
      </ol>
      <p>
        Local data storage should be organized as a service emulating a backend.
        (A class called Backend is required that pseudo-asynchronously saves
        data in localStorage.)
      </p>
    </div>
    <div class="part">
      <p><b>Additionally:</b></p>
      <ol>
        <li>Consider the display on mobile devices.</li>
        <li>Provide localization.</li>
        <li>
          It is necessary to write 1 unit test for any component using
          <b>jest</b>.
        </li>
      </ol>
      <p>
        <b>Reminder:</b> The test assignment is designed to demonstrate the
        ability to write good modular code, as well as to utilize the specified
        technologies and beyond. This code should be a source of pride.
      </p>
    </div>
    <div class="part">
      <p><b>Example:</b></p>
      <slot name="example" />
    </div>
  </div>
</template>
