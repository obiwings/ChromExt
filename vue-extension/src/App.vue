<script setup>
import { ref } from 'vue'

const models = ref(
  [
    {
      symbol: 'RF',
      Name: 'RF',
      xprice: 398000,
      yprice: 298900,
    },
    {
      symbol: 'XGB',
      Name: 'XGB',
      xprice: '-',
      yprice: 277500,
    },
    {
      symbol: 'logistic',
      Name: 'Logistic',
      xprice: '-',
      yprice: 330500,
    },
    {
      symbol: 'LSTM',
      Name: 'LSTM',
      xprice: '-',
      yprice: 265000,
    },
  ]
)
</script>




<template>
    <!-- <main>
        <img src = "./predi.png" style = "margin-top:40px;margin-left:auto;margin-right:auto;display:block;">
        <h1 style = "text-align:center;font-size:20px;color:rgb(49, 48, 48)"><span style = "font-family: 'Cairo', sans-serif;">RESELL VALUE GUIDE SYSTEM</span></h1>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700&display=swap" rel="stylesheet">
    </main>

    <div class="wrapper" style = "text-align:center;">
        <link rel="stylesheet" href="./onf_btn.css">
        <input type="checkbox" id="switch">
        <label for="switch" class="switch_label">
          <span class="onf_btn"></span>
        </label>
    </div> -->
  <nav>
    <img src="./long_predi.png" alt="logo" style = "max-width: 100%; height: auto;">
  </nav>


  <main class = "main">
      <div class = "shoespic">
          <img class = "tabon" src="./pepetabon.jpg" alt="tabon">
      </div>
      <div class = "price_table">
        <table>
          <thead>
            <tr>
              <th>모델명</th>
              <th>출시가</th>
              <th>예상가</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for = "model in models" :key = "model.symbol">
              <td>
                <div>{{ model.Name }}</div>
              </td>
              <td>
                <div>{{ model.xprice }}</div>
              </td>
              <td>
                <div>{{ model.yprice }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  </main>



  <footer>
    <h1 style = "text-align:center;font-size:20px;color:rgb(49, 48, 48)"><span style = "font-family: 'Cairo', sans-serif;">RESELL VALUE GUIDE SYSTEM</span></h1>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700&display=swap" rel="stylesheet">
  </footer>
</template>





<style scoped>

.main {
  display: flex;
}

.shoespic {
    float: left;
    height: auto;
    overflow: hidden;
    width: 40%;
    text-align: center;
    display: flex; justify-content: center;
}

.tabon {
    max-width: 200px;
    max-height: 200px;
}
.price_table {
  margin: auto;
}

.price1 {
    float: right;
    height: auto;
    overflow: hidden;
    width : 60%;
    display: flex; justify-content: center;
    font-size: 24px;
    line-height: 100px;
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
