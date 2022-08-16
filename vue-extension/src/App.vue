<script setup>

</script>




<template>
  <nav>
    <img src="./long_predi.png" alt="logo" style = "max-width: 100%; height: auto;">
  </nav>

  <div class = "shoespic">
      <img class = "tabon" src="./pepetabon.jpg" alt="tabon">
  </div>


  <div class = "Price-tab">
    <div></div>
    <div id = "P1">High Price :</div> <div id = "P2">5813431원</div>
    <div id = "P1">Low Price :</div> <div id = "P2">518292원</div>
    <div id = "P1">Release Price :</div> <div id = "P2">149200원</div>
  </div>



  <footer>
    RESELL VALUE GUIDE SYSTEM
  </footer>
</template>





<style scoped>

template {
  width: 300px;
}

nav {
  width: 300px;
  height: auto;
}

.shoespic {
  width: 280px;
  height: 280px;
  padding: 10px;
}

.tabon {
  width: 280px;
  height: 280px
}

.Price-tab {
  width: 300px;
  height: 90px;
  font-size: 16px;
}

#P1 {
  float: left; width: 40%;
}

#P2 {
  float: left; width: 60%;
}

footer {
  width: 300px;
  height: 20px;
  text-align: center;
  font-size:12px;
  color:rgb(49, 48, 48);
}

</style>
