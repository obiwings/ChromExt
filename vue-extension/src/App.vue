<script setup>

// let PREDICT_KEY = localStorage.PREDICT_VALUE

</script>




<template>

  <main>
      <img src = "./predi.png" style = "margin-top:40px;margin-left:auto;margin-right:auto;display:block;">
      <h1 style = "text-align:center;font-size:20px;color:rgb(49, 48, 48)"><span style = "font-family: 'Cairo', sans-serif;">RESELL VALUE GUIDE SYSTEM</span></h1>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700&display=swap" rel="stylesheet">
  </main>

  <div class="wrapper" style = "text-align:center;">
      <link rel="stylesheet" href="onf_btn.css">
      <input type="checkbox" id="switch">
      <label for="switch" class="switch_label">
        <span class="onf_btn"></span>
      </label>
  </div>
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

.wrapper {
    width: 50px;
    height: 50px;
    text-align: center;
    margin: 50px auto;
  }
  #switch {
    position: absolute;
    /* hidden */
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
  
  .switch_label {
    position: relative;
    cursor: pointer;
    display: inline-block;
    width: 58px;
    height: 28px;
    background: #fff;
    border: 2px solid #daa;
    border-radius: 20px;
    transition: 0.2s;
  }
  .switch_label:hover {
    background: #efefef;
  }
  .onf_btn {
    position: absolute;
    top: 4px;
    left: 3px;
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background: #daa;
    transition: 0.2s;
  }
  
  /* checking style */
  #switch:checked+.switch_label {
    background: #c44;
    border: 2px solid #c44;
  }
  
  #switch:checked+.switch_label:hover {
    background: #e55;
  }
  
  /* move */
  #switch:checked+.switch_label .onf_btn {
    left: 34px;
    background: #fff;
    box-shadow: 1px 2px 3px #00000020;
  }

</style>
