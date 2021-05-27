<template>
      <v-dialog
        v-model="$store.state.toggleSearch"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
        <v-sheet tile>
            <v-toolbar
                flat
                light
                color="primary"
            >
                <v-btn
                icon
                dark
                @click="$store.state.toggleSearch = false"
                >
                <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-text-field
                    label="Search Everything"
                    solo
                ></v-text-field>
        <search-results/>
        </v-sheet>
      </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SearchResults from '@/components/SearchResults.vue'

@Component({
  components: {
      SearchResults
  },
})
export default class Search extends Vue {}
</script>
