
<template>
  <div id="app" class="main d-flex flex-column">
  
    <top-bar></top-bar>
  
    <div class="row flex-1">
      <div class="col-3 bg-faded pr-0 flex-1 d-flex flex-column">
        <side-panel></side-panel>
      </div>
      <div class="col-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import TopBar from './components/TopBar/TopBar'
import SidePanel from './components/SidePanel/SidePanel'

export default {
  name: 'app',
  components: {
    TopBar,
    SidePanel
  }
}
</script>
<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';

html,
body,
#app {
  height: 100%;
  overflow: hidden;
}

.tooltip {
  display: block !important;
  padding: 4px;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: #A5DBDB;
  color: #000000;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip tooltip-arrow {
  display: none;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}


.btn-primary {
  background-color: #00576D;
  color: #FFFFFF;
}

.btn-primary:hover {
  background-color: #A5DBDB;
  color: #000000;
  border: none;
}

.btn-secondary {
  background-color: #D7D7D7;
  border: none;
}
</style>
<style lang="scss" scoped>
.main {
  height: 100%;
}

.flex-1 {
  flex: 1;
}
</style>
 
