/* ============================================================
   COMBOS — carrusel de combos (colchón + base + accesorios).
   Requiere en el HTML:
     <div class="oferta-carousel" id="combosGrid"></div>
     <button id="ccPrev" onclick="ccMove(-1)">...</button>
     <button id="ccNext" onclick="ccMove(1)">...</button>
   Requiere en el ámbito global (cargar DESPUÉS de carrusel-ofertas.js,
   que crea window.products, y ANTES de carrito.js):
     - window.products, window.money   → carrusel-ofertas.js
   Este archivo agrega los combos a window.products, para que el
   carrito (carrito.js) pueda encontrarlos por id igual que cualquier
   otro producto.
   Expone globalmente: window.ccMove(dir)
   ============================================================ */
(function () {

  window.ccMove = function () { }; // no-op por defecto

  const combos = [
    {
      id: 'ColchonNube+BaseCama',
      name: 'Combo Colchón Orion Nube + base cama',
      tag: 'Colchón Orion Nube, multimedidas, firmeza suabe + base cama',
      desc: 'Colchón Orion Nube, multimedidas, firmeza suabe + base cama',
      old: 2409995, now: 1982990,
      img: 'img/combos/Nube-bc01.png',
      gallery: [
        'img/combos/Nube-bc02.png',
        'img/combos/Nube-bc01.png', 'img/combos/Nube-bc03.png', 'img/combos/Nube-bc04.png', 'img/combos/BC01.png', 'img/combos/BC02.png', 'img/m-normal.png'],
      sizes: [
        { label: "Sencillo", now: 1916990, old: 2317995, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 1982990, old: 2409995, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 2257990, old: 2719995, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
        { label: "Queen", now: 2890990, old: 3175995, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
        { label: "King", now: 3750990, old: 4120995, medidas: { ancho: "200 cm", largo: "200 cm", alto: null } }]
    },
    {
      id: 'ColchonNube+RopaCama',
      name: 'Combo Colchón Orion Nube + ropa de cama',
      tag: 'Colchón Orion Nube, multimedidas, firmeza suave + almohada siliconada y protector siliconado',
      desc: 'Colchón Orion Nube, multimedidas, firmeza suave + almohada siliconada y protector siliconado',
      old: 2043770, now: 1809990,
      img: 'img/combos/Nube-rc01.png',
      gallery: ['img/combos/Nube-rc02.png', 'img/combos/Nube-rc01.png', 'img/combos/Nube-rc03.png', 'img/combos/Nube-rc04.png', 'img/m-normal.png'],
      sizes: [
        { label: "Sencillo", now: 1764990, old: 1993770, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 1809990, old: 2043770, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 2097990, old: null, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
        { label: "Queen", now: 2643990, old: 2983040, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
        { label: "King", now: 3414990, old: null, medidas: { ancho: "200 cm", largo: "200 cm", alto: null } }]
    },
    {
      id: 'ColchonVenus+BaseCama',
      name: 'Combo Colchón Orion Venus + base cama',
      tag: 'Colchón Orion Venus,  multimedidas, firmeza suabe + base cama',
      desc: 'Colchón Orion Venus,  multimedidas, firmeza suabe + base cama',
      old: 1559995, now: 1316990,
      img: 'img/combos/Venus-bc01.png',
      gallery: ['img/combos/Venus-bc02.png', 'img/combos/Venus-bc01.png', 'img/combos/Venus-bc03.png', 'img/combos/Venus.png', 'img/combos/Venus-bc04.png', 'img/combos/BC01.png', 'img/combos/BC02.png', 'img/m-normal.png'],
      sizes: [
        { label: "Sencillo", now: 1196990, old: 1417995, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 1316990, old: 1559995, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 1469990, old: 1719995, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
        { label: "Queen", now: 1741990, old: 1755995, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
        { label: "King", now: 2331990, old: 2350995, medidas: { ancho: "200 cm", largo: "200 cm", alto: null } }]
    },
    {
      id: 'ColchonVenus+RopaCama',
      name: 'Combo Colchón Orion Venus + ropa de cama',
      tag: 'Colchón Orion Venus, multimedidas, firmeza media + almohada siliconada y protector siliconado',
      desc: 'Colchón Orion Venus, multimedidas, firmeza media + almohada siliconada y protector siliconado',
      old: 1193770, now: 1143900,
      img: 'img/combos/Venus-rc01.png',
      gallery: ['img/combos/Venus-rc02.png', 'img/combos/Venus-rc01.png', 'img/combos/Venus-rc03.png', 'img/combos/Venus-rc03.png', 'img/combos/Venus.png', 'img/m-normal.png'],
      sizes: [
        { label: "Sencillo", now: 1044990, old: 1093770, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 1143990, old: 1193770, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 1309990, old: 1373520, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
        { label: "Queen", now: 1493990, old: 1563040, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
        { label: "King", now: 1994990, old: 2072560, medidas: { ancho: "200 cm", largo: "200 cm", alto: null } }]
    },
    {
      id: 'ColchonGalaxy+BaseCama',
      name: 'Combo Colchón Orion Galaxy + base cama',
      tag: 'Colchón Orion Galaxy,  multimedidas, firmeza suabe + base cama',
      desc: 'Colchón Orion Galaxy,  multimedidas, firmeza suabe + base cama',
      old: 1669995, now: 1455990,
      img: 'img/combos/Galaxy-bc01.png',
      gallery: ['img/combos/Galaxy-bc02.png', 'img/combos/Galaxy-bc01.png', 'img/combos/Galaxy-bc03.png', 'img/combos/Galaxy-bc04.png', 'img/combos/BC01.png', 'img/combos/BC02.png', 'img/m-normal.png'],
      sizes: [
        { label: "Sencillo", now: 1295990, old: 1517995, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 1455990, old: 1669995, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 1568990, old: 1819995, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
        { label: "Queen", now: 1859990, old: 1875995, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
        { label: "King", now: 2548990, old: 2570995, medidas: { ancho: "200 cm", largo: "200 cm", alto: null } }]
    },
    {
      id: 'ColchonGalaxy+RopaCama',
      name: 'Combo Colchón Orion Galaxy + ropa de cama',
      tag: 'Colchón Orion Galaxy,  multimedidas, firmeza suabe + almohada siliconada y protector siliconado',
      desc: 'Colchón Orion Galaxy,  multimedidas, firmeza suabe + almohada siliconada y protector siliconado',
      old: 1333770, now: 1280990,
      img: 'img/combos/Galaxy-rc01.png',
      gallery: ['img/combos/Galaxy-rc02.png', 'img/combos/Galaxy-rc01.png', 'img/combos/Galaxy-rc03.png', 'img/combos/Galaxy-rc04.png', 'img/m-normal.png',],
      sizes: [
        { label: "Sencillo", now: 1143990, old: 1193770, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 1281990, old: 1333770, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 1408990, old: 1473520, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
        { label: "Queen", now: 1612990, old: 1683040, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
        { label: "King", now: 2212990, old: 2292560, medidas: { ancho: "200 cm", largo: "200 cm", alto: null } }]
    },
    // SuperFlexFoam
    {
      id: 'ColchonSuperFlexFoam+BaseCama',
      name: 'Combo Colchón Orion Super flex Foam + base cama',
      tag: 'Colchón Orion Super Flex Foam,  multimedidas, firmeza suabe + base cama',
      desc: 'Colchón Orion Super Flex Foam,  multimedidas, firmeza suabe + base cama',
      old: 1259995, now: 1019990,
      img: 'img/combos/Sf-foam-bc01.png',
      gallery: ['img/combos/Sf-foam-bc02.png', 'img/combos/Sf-foam-bc01.png', 'img/combos/Sf-foam01.png', 'img/combos/Sf-foam02.png', 'img/combos/Sf-foam03.png', 'img/combos/BC01.png', 'img/combos/BC02.png', 'img/m-normal.png'],
      sizes: [
        { label: "Sencillo", now: 899990, old: 1117995, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 1019990, old: 1259995, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 1277990, old: 1319995, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
        { label: "Queen", now: 1463990, old: null, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
        { label: "King", now: 1707990, old: 1720995, medidas: { ancho: "200 cm", largo: "200 cm", alto: null } }]
    },

    {
      id: 'ColchonSuperFlexFoam+ropadecama',
      name: 'Combo Colchón Orion Super Flex Foam + ropa de cama',
      tag: 'Colchón Orion Super Flex Foam,  multimedidas, firmeza suabe  almohada siliconada y protector siliconado',
      desc: 'Colchón Orion Super Flex Foam,  multimedidas, firmeza suabe + almohada siliconada y protector siliconado',
      old: 893770, now: 846990,
      img: 'img/combos/Sf-foam-rc01.png',
      gallery: ['img/combos/Sf-foam-rc02.png', 'img/combos/Sf-foam-rc01.png', 'img/combos/Sf-foam-rc03.png', 'img/combos/Sf-foam01.png', 'img/combos/Sf-foam02.png', 'img/combos/Sf-foam03.png', 'img/combos/Sf-foam-rc04.png', 'img/m-normal.png',],
      sizes: [
        { label: "Sencillo", now: 747990, old: 793770, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 846990, old: 893770, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 913990, old: 973520, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
        { label: "Queen", now: 1067990, old: 1133040, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
        { label: "King", now: 1370990, old: 1442560, medidas: { ancho: "200 cm", largo: "200 cm", alto: null } }]
    },
    {
      id: 'ColchonSuperFlexFirm+BaseCama',
      name: 'Combo Colchón Orion Super Flex Firm + Base Cama',
      tag: 'Colchón Orion Super Flex Firm,  multimedidas, firmeza suabe + almohada siliconada y protector siliconado',
      desc: 'Colchón Orion Super Flex Firm,  multimedidas, firmeza suabe + almohada siliconada y protector siliconado',
      old: 1309995, now: 1068990,
      img: 'img/combos/Sf-firm-bc01.png',
      gallery: ['img/combos/Sf-firm-bc02.png', 'img/combos/Sf-firm-bc01.png', 'img/combos/BC01.png', 'img/combos/BC02.png', 'img/m-normal.png'],
      sizes: [
        { label: "Sencillo", now: 948990, old: 1167995, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 1068990, old: 1309995, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 1172990, old: 1419995, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
        { label: "Queen", now: 1414990, old: 1425995, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
        { label: "King", now: 1905990, old: 1920995, medidas: { ancho: "200 cm", largo: "200 cm", alto: null } }]
    },
    {
      id: 'ColchonSuperFlexFirm+RopaCama',
      name: 'Combo Colchón Orion Super Flex Firm + ropa de cama',
      tag: 'Colchón Orion Super Flex Firm + ropa de cama,  multimedidas, firme + base cama',
      desc: 'Colchón Orion Super Flex Firm + ropa de cama,  multimedidas, firme + almohada siliconada y protector siliconado',
      old: 943770, now: 895990,
      img: 'img/combos/Sf-firm-rc01.png',
      gallery: ['img/combos/Sf-firm-rc02.png', 'img/combos/Sf-firm-rc01.png', 'img/combos/Sf-firm-rc03.png', 'img/combos/Sf-firm-rc04.png', 'img/m-normal.png',],
      sizes: [
        { label: "Sencillo", now: 796990, old: 843770, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 895990, old: 943770, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 1012990, old: 1073520, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
        { label: "Queen", now: 1166990, old: 1233040, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
        { label: "King", now: 1568990, old: 1642560, medidas: { ancho: "200 cm", largo: "200 cm", alto: null } }]
    },

    {
      id: 'ColchonSensacionFirm+BaseCama',
      name: 'Combo Colchón Orion Sensacion Firm + Base Cama',
      tag: 'Colchón Orion Sensacion Firm,  multimedidas, firmeza suabe + almohada siliconada y protector siliconado',
      desc: 'Colchón Orion Sensacion Firm,  multimedidas, firmeza suabe + almohada siliconada y protector siliconado',
      old: 139995, now: 992990,
      img: 'img/combos/Sencacion-bc01.png',
      gallery: ['img/combos/Sencacion-bc02.png', 'img/combos/Sencacion-bc01.png', 'img/combos/Sencacion03.png', 'img/combos/Sencacion04.png', 'img/combos/BC01.png', 'img/combos/BC02.png', 'img/m-normal.png'],
      sizes: [
        { label: "Sencillo", now: 881990, old: 116700, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 992990, old: 139995, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 1087990, old: 1419995, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } }]
    },
    {
      id: 'ColchonSensacionFirm+RopaCama',
      name: 'Combo Colchón Orion Sensacion Firm + ropa de cama',
      tag: 'Colchón Orion Sensacion Firm + ropa de cama,  multimedidas, firme + base cama',
      desc: 'Colchón Orion Sensacion Firm + ropa de cama,  multimedidas, firme + almohada siliconada y protector siliconado',
      old: 943770, now: 819990,
      img: 'img/combos/Sencacion-rc01.png',
      gallery: ['img/combos/Sencacion-rc02.png', 'img/combos/Sencacion-rc01.png', 'img/combos/Sencacion-rc03.png', 'img/combos/Sencacion03.png', 'img/combos/Sencacion04.png', 'img/m-normal.png',],
      sizes: [
        { label: "Sencillo", now: 729990, old: 843770, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 819990, old: 943770, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 927990, old: 1073520, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } }]
    },

    {
      id: 'ColchonEstela+BaseCama',
      name: 'Combo Colchón Orion Estelar + Base Cama',
      tag: 'Colchón Orion Estelar,  multimedidas, firmeza suabe + almohada siliconada y protector siliconado',
      desc: 'Colchón Orion Estelar,  multimedidas, firmeza suabe + almohada siliconada y protector siliconado',
      old: 1517995, now: 1352990,
      img: 'img/combos/Estelar-bc01.png',
      gallery: ['img/combos/Sencacion-bc02.png', 'img/combos/Estelar-bc01.png', 'img/combos/Estelar-03.png', 'img/combos/Estelar-04.png', 'img/combos/Estelar-05.png', 'img/combos/Estelar-06.png', 'img/combos/BC01.png', 'img/combos/BC02.png', 'img/m-normal.png'],
      sizes: [
        { label: "Sencillo", now: 1196990, old: 1517995, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 1352990, old: 1709995, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 1492990, old: 1869995, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } }]
    },
    {
      id: 'ColchonEstelar+RopaCama',
      name: 'Combo Colchón Orion Estelar + ropa de cama',
      tag: 'Colchón Orion SEstelar + ropa de cama,  multimedidas, firme + base cama',
      desc: 'Colchón Orion Estelar + ropa de cama,  multimedidas, firme + almohada siliconada y protector siliconado',
      old: 943770, now: 819990,
      img: 'img/combos/Estelar-rc01.png',
      gallery: ['img/combos/Estelar-rc02.png', 'img/combos/Estelar-rc01.png', 'img/combos/Estelar-03.png', 'img/combos/Estelar-04.png', 'img/combos/Estelar-05.png', 'img/combos/Estelar-06.png', 'img/m-normal.png',],
      sizes: [
        { label: "Sencillo", now: 1044990, old: 1193770, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 1179990, old: 1343770, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 1332990, old: 1523520, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } }]
    },

    {
      id: 'ColchonCosmo+BaseCama',
      name: 'Combo Colchón Orion Cosmo + Base Cama',
      tag: 'Colchón Orion Cosmo,  multimedidas, firmeza suabe + almohada siliconada y protector siliconado',
      desc: 'Colchón Orion Cosmo,  multimedidas, firmeza suabe + almohada siliconada y protector siliconado',
      old: 1909995, now: 1532990,
      img: 'img/combos/Cosmos-bc01.png',
      gallery: ['img/combos/Cosmos-bc02.png', 'img/combos/Cosmos-bc01.png', 'img/combos/Cosmos04.png', 'img/combos/Cosmos05.png', 'img/combos/BC01.png', 'img/combos/BC02.png', 'img/m-normal.png'],
      sizes: [
        { label: "Sencillo", now: 1286990, old: 1617995, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 1532990, old: 1909995, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 1897990, old: 2319995, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
        { label: "Queen", now: 2125990, old: 2325995, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
        { label: "King", now: 2625990, old: 2870995, medidas: { ancho: "200 cm", largo: "200 cm", alto: null } }]
    },
    {
      id: 'ColchonCosmo+RopaCama',
      name: 'Combo Colchón Orion Cosmo + ropa de cama',
      tag: 'Colchón Orion Cosmo + ropa de cama,  multimedidas, firme + base cama',
      desc: 'Colchón Orion Cosmo + ropa de cama,  multimedidas, firme + almohada siliconada y protector siliconado',
      old: 1309995, now: 948990,
      img: 'img/combos/Cosmos-rc01.png',
      gallery: ['img/combos/Cosmos-rc02.png', 'img/combos/Cosmos-rc01.png', 'img/combos/Cosmos04.png', 'img/combos/Cosmos05.png', 'img/m-normal.png',],
      sizes: [
        { label: "Sencillo", now: 1134990, old: 1293770, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 1359990, old: 1543770, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 1737990, old: 1973520, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
        { label: "Queen", now: 1878990, old: 2133040, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
        { label: "King", now: 2289990, old: 2592560, medidas: { ancho: "200 cm", largo: "200 cm", alto: null } }]
    },
    {
      id: 'ColchonImperium+BaseCama',
      name: 'Combo Colchón Orion Imperium + Base Cama',
      tag: 'Colchón Orion Imperium,  multimedidas, firmeza suabe + almohada siliconada y protector siliconado',
      desc: 'Colchón Orion Imperium,  multimedidas, firmeza suabe + almohada siliconada y protector siliconado',
      old: 3609995, now: 3062990,
      img: 'img/combos/Imperium-bc01.png',
      gallery: ['img/combos/Imperium-bc02.png', 'img/combos/Imperium-bc01.png', 'img/combos/Imperium04.png', 'img/combos/Imperium05.png', 'img/combos/BC01.png', 'img/combos/BC02.png', 'img/m-normal.png'],
      sizes: [
        { label: "Sencillo", now: 2636990, old: 3117995, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 3062990, old: 3609995, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 3517990, old: 4119990, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
        { label: "Queen", now: 3970990, old: 4375995, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
        { label: "King", now: 4785990, old: 5270995, medidas: { ancho: "200 cm", largo: "200 cm", alto: null } }]
    },
    {
      id: 'ColchonImperium+RopaCama',
      name: 'Combo Colchón Orion Imperium + ropa de cama',
      tag: 'Colchón Orion Imperium + ropa de cama,  multimedidas, firme + base cama',
      desc: 'Colchón Orion Imperium + ropa de cama,  multimedidas, firme + almohada siliconada y protector siliconado',
      old: 1309995, now: 948990,
      img: 'img/combos/Imperium-rc01.png',
      gallery: ['img/combos/Imperium-rc02.png', 'img/combos/Imperium-rc01.png', 'img/combos/Imperium-rc03.png', 'img/combos/Imperium04.png', 'img/combos/Imperium05.png', 'img/m-normal.png',],
      sizes: [
        { label: "Sencillo", now: 2485990, old: 2793770, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 2889990, old: 3543770, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 3357990, old: 3773520, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
        { label: "Queen", now: 3723990, old: 4183040, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
        { label: "King", now: 4449990, old: 4992560, medidas: { ancho: "200 cm", largo: "200 cm", alto: null } }]
    },

  ];

  function initCombos() {
    const grid = document.getElementById('combosGrid');
    const prevBtn = document.getElementById('ccPrev');
    const nextBtn = document.getElementById('ccNext');

    // El catálogo global se completa SIEMPRE, incluso en páginas (como
    // detalle.html) que no tienen el carrusel visual de combos — si no,
    // esas páginas nunca encuentran el producto por id.
    if (Array.isArray(window.products)) {
      window.products = window.products.concat(combos);
    } else {
      window.products = combos.slice();
    }

    if (!grid) {
      console.warn('[combos] Falta #combosGrid en el HTML. Se omite el carrusel visual, pero el catálogo ya quedó completo.');
      return;
    }

    const money = window.money || (n => '$' + n);

    combos.forEach(p => {
      const off = Math.round((1 - p.now / p.old) * 100);
      const card = document.createElement('div');
      card.className = 'pcard';
      card.innerHTML = `
    <div class="img-wrap">
      <span class="discount-pill">-${off}%</span>
      <img src="${p.img}" alt="${p.name}" loading="lazy">
    </div>
    <div class="body">
      <h3>${p.name}</h3>
      <p class="tag">${p.tag}</p>
      <div class="prices">
        <span class="old">${money(p.old)}</span>
        <span class="now">${money(p.now)}</span>
      </div>
      <a class="ver-detalle" href="detalle.html?id=${encodeURIComponent(p.id)}">Ver especificaciones</a>
      <button class="add-btn" data-id="${p.id}">Agregar al carrito</button>
    </div>`;
      grid.appendChild(card);
    });

    grid.addEventListener('click', e => {
      const btn = e.target.closest('.add-btn');
      if (!btn) return;
      if (typeof window.addToCart === 'function') {
        window.addToCart(btn.dataset.id);
      } else {
        console.warn('[combos] window.addToCart no está definido.');
      }
      btn.textContent = 'Agregado ✓';
      btn.classList.add('added');
      setTimeout(() => { btn.textContent = 'Agregar al carrito'; btn.classList.remove('added'); }, 1400);
    });

    // ---- scroll / navegación (mismo patrón que el carrusel de ofertas) ----
    function ccMoveInternal(dir) {
      const card = grid.querySelector('.pcard');
      const step = card ? card.getBoundingClientRect().width + 20 : 290;
      grid.scrollBy({ left: dir * step * 2, behavior: 'smooth' });
    }

    function updateCcArrows() {
      if (!prevBtn || !nextBtn) return;
      prevBtn.disabled = grid.scrollLeft <= 4;
      nextBtn.disabled = grid.scrollLeft >= grid.scrollWidth - grid.clientWidth - 4;
    }

    window.ccMove = ccMoveInternal;

    grid.addEventListener('scroll', updateCcArrows);
    window.addEventListener('resize', updateCcArrows);
    setTimeout(updateCcArrows, 200);
  }

  try {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initCombos);
    } else {
      initCombos();
    }
  } catch (err) {
    console.warn('[combos] No se pudo inicializar:', err);
  }

})();
