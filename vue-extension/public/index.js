// var Brand;
// var Name;
// var ReleaseDate;
// var ReleasePrice;
// var CollabBrand;

// Brand = document.querySelector('a.brand').text;
// Name = document.querySelector('p.title').textContent;
// ReleaseDate = document.querySelectorAll('dd.product_info')[1].textContent;
// ReleasePrice = document.querySelectorAll('dd.product_info')[3].textContent;

// if (Name.includes(' x ')) {
//     CollabBrand = Name.split(' x ')[1].split(' ')[0]
// } else {
//     CollabBrand = '-'
// };

// localStorage.setItem('Brand', Brand);
// localStorage.setItem('Name', Name);
// localStorage.setItem('CollabBrand', CollabBrand);
// localStorage.setItem('ReleaseDate', ReleaseDate);
// localStorage.setItem('ReleasePrice', ReleasePrice);

// console.log('Brand :', Brand, 
// 'CB :', CollabBrand, 
// 'Name :', Name, 
// 'RD :', ReleaseDate, 
// 'RP :', ReleasePrice);

var shoesObject = {};
// Brand
shoesObject['Brand'] = document.querySelector('a.brand').text;
// Name
shoesObject['Name'] = document.querySelector('p.title').textContent;
// ReleaseDate
shoesObject['ReleaseDate'] = document.querySelectorAll('dd.product_info')[1].textContent;
// ReleasePrice
shoesObject['ReleasePrice'] = document.querySelectorAll('dd.product_info')[3].textContent;
// Collab
if (shoesObject['Name'].includes(' x ')) {
    shoesObject['Collab'] = 1
} else {
    shoesObject['Collab'] = 0
};

for (var key in shoesObject) {
    console.log("key : ", key +", value :" + shoesObject[key]);
}
