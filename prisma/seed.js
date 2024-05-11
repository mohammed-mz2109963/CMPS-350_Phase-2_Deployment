import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create buyers
    const buyers = await prisma.user.createMany({
        data: [
        {
            id: 1,
            type: "buyer",
            username: "BUYER1",
            password: "BUYER1@Scambox",
            name: "buyer1_name",
            surname: "buyer1_surname",
            money_balance: 1000,
            contact_person_name: "Buyer 1",
            street: "123 Buyer Street",
            apartment_suite_number: "Apt 404",
            city: "Doha",
            state: "Qatar",
            zip_code: "22744",
            mobile_number: "123-456-7890"
        },
        {
            id: 2,
            type: "buyer",
            username: "BUYER2",
            password: "BUYER2@Scambox",
            name: "buyer2_name",
            surname: "buyer2_surname",
            money_balance: 1500,
            contact_person_name: "Buyer 2",
            street: "456 Buyer Street",
            apartment_suite_number: "Apt 101",
            city: "Mesaieed",
            state: "Qatar",
            zip_code: "22744",
            mobile_number: "987-654-3210"
        },
        {
            id: 3,
            type: "buyer",
            username: "BUYER3",
            password: "BUYER3@Scambox",
            name: "buyer3_name",
            surname: "buyer3_surname",
            money_balance: 2000,
            contact_person_name: "Buyer 3",
            street: "789 Buyer Street",
            apartment_suite_number: "Apt 303",
            city: "Lucknow",
            state: "India",
            zip_code: "90210",
            mobile_number: "111-222-3333"
            }
            ]
        });

    // Create sellers
    const sellers = await prisma.user.createMany({
        data: [
        {
            id: 4,
            type: "seller",
            username: "SELLER1",
            password: "SELLER1@Scambox",
            name: "seller1_name",
            surname: "seller1_surname",
            company_name: "Seller Company 1",
            bank_account: "123456789"
        },
        {
            id: 5,
            type: "seller",
            username: "SELLER2",
            password: "SELLER2@Scambox",
            name: "seller2_name",
            surname: "seller2_surname",
            company_name: "Seller Company 2",
            bank_account: "987654321"
        }
        ]
    });

    // Create sellers
    const admins = await prisma.user.createMany({
        data: [
        {
            id: 6,
            type: "admin",
            username: "ADMIN1",
            password: "ADMIN1@Scambox",
            name: "ADMIN1_name",
            surname: "ADMIN1_surname"
        }
        ]
    });

    //console.log("Sellers:", sellers[1]);

    // Create products
    const products = await prisma.product.createMany({
        data: [
        {
            id: 1001,
            year: 2000,
            make: "Toyota",
            model: "Corolla",
            type: "sedan",
            price: 50000,
            distance: 250000,
            image_url: "https://www.cars.com/i/large/in/v2/stock_photos/3e36757b-ec3b-455e-82e7-eb6f65c82695/eb348de0-cb6b-409a-9ddd-fde9efcc4b20.png",
            seller_id: 4
        },
        {
            id: 1002,
            year: 2015,
            make: "Toyota",
            model: "Rav4",
            type: "SUV",
            price: 60000,
            distance: 30000,
            image_url: "https://ymimg1.b8cdn.com/resized/car_model/1509/pictures/1158171/mobile_listing_main_2014_Toyota_Rav4_Front_2.jpg",
            seller_id: 4
        },
        {
            id: 1003,
            year: 2020,
            make: "Honda",
            model: "Accord",
            type: "Coupe",
            price: 70000,
            distance: 12000,
            image_url: "https://static1.hotcarsimages.com/wordpress/wp-content/uploads/2020/10/Accord-EX-L-V6-Coupe-Front.jpg",
            seller_id: 5
        },
        {
            id: 1004,
            year: 2012,
            make: "Nissan",
            model: "Tiida",
            type: "Hatchback",
            price: 80000,
            distance: 2500,
            image_url: "https://media.drive.com.au/obj/tx_rs:fit:1920:1080,q:50,w:1920/driveau/upload/cms/uploads/NIH2m6nQSa2pxpGJk7Gn",
            seller_id: 5
        },
        {
            id: 1005,
            year: 2017,
            make: "Polestar",
            model: "1",
            type: "Hyper",
            price: 90000,
            distance: 0,
            image_url: "https://static1.srcdn.com/wordpress/wp-content/uploads/2020/09/car-in-need-for-speed-heat-.jpg",
            seller_id: 5
        },
        {
            id: 1006,
            year: 2017,
            make: "Dodge",
            model: "Viper",
            type: "Sports",
            price: 100000,
            distance: 0,
            image_url: "https://di-uploads-pod16.dealerinspire.com/kendalldodgechryslerjeepram1/uploads/2021/10/Viper-10-Kendall-Dodge.jpg",
            seller_id: 4
        },
        {
            id: 1007,
            year: 2020,
            make: "Chevrolet",
            model: "Camaro SS",
            type: "Convertible",
            price: 110000,
            distance: 0,
            image_url: "https://file.kelleybluebookimages.com/kbb/base/house/2020/2020-Chevrolet-Camaro-FrontSide_CHCAMRSS2001_640x480.jpg",
            seller_id: 5
        },
        {
            id: 1008,
            year: 2024,
            make: "Porsche",
            model: "911 GT3 R",
            type: "Sports",
            price: 120000,
            distance: 0,
            image_url: "https://mediaassets.pca.org/pages/pca/images/content/img_9(3).jpg",
            seller_id: 4
        },
        {
            id: 1009,
            year: 2021,
            make: "Mercedes",
            model: "CLE",
            type: "Coupe",
            price: 130000,
            distance: 150,
            image_url: "https://www.mercedes-benz.co.uk/content/dam/hq/passengercars/cars/cle/cle-coupe-c236-pi/modeloverview/06-2023/images/mercedes-benz-cle-coupe-c236-model-overview-696x392-06-2023.png",
            seller_id: 5
        },
        {
            id: 1010,
            year: 2024,
            make: "Koenigsegg",
            model: "Gemera",
            type: "Hyper",
            price: 140000,
            distance: 0,
            image_url: "https://media.drive.com.au/obj/tx_rs:fit:1920:1080,q:50,w:1920/caradvice/private/iippmjm5pwsz350e6hxb",
            seller_id: 5
        },
        {
            id: 1011,
            year: 2024,
            make: "Toyota",
            model: "Camry",
            type: "Sedan",
            price: 150000,
            distance: 0,
            image_url: "https://i.gaw.to/vehicles/photos/40/36/403605-2024-toyota-camry.jpg?640x400",
            seller_id: 5
        },
        {
            id: 1012,
            year: 2009,
            make: "Ford",
            model: "Fusion",
            type: "Sedan",
            price: 160000,
            distance: 125000,
            image_url: "https://i.gaw.to/vehicles/photos/00/98/009825_2009_Ford_Fusion.jpg?1024x640",
            seller_id: 5
        },
        ]
    });

    // Create purchases
    const purchases = await prisma.purchase.createMany({
        data: [
        {
            buyer_id: 1,
            product_id: 1001
        },
        {
            buyer_id: 2,
            product_id: 1002
        },
        {
            buyer_id: 3,
            product_id: 1003
        },
        {
            buyer_id: 2,
            product_id: 1005
        },
        {
            buyer_id: 2,
            product_id: 1008
        },
        {
            buyer_id: 3,
            product_id: 1011
        },
        {
            buyer_id: 2,
            product_id: 1012
        }
        ]
    });

    // Output entire data for products and purchases
    console.log("Buyers:");
    console.log(buyers);
    console.log("Sellers:");
    console.log(sellers);
    console.log("Admins:");
    console.log(admins);
    console.log("Products:");
    console.log(products);
    console.log("Purchases:");
    console.log(purchases);

    console.log("Database seeded successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });