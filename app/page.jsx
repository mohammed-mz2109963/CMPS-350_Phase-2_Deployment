'use client'

import React, { useState, useEffect } from 'react';
import styles from "@/app/page.module.css";
import Link from 'next/link';

function Page() {
    const [totalPurchases, setTotalPurchases] = useState(null);
    const [buyersPerState, setBuyersPerState] = useState(null);
    const [topProducts, setTopProducts] = useState(null);
    const [averagePrice, setAveragePrice] = useState(null);
    const [saleInfo, setSaleInfo] = useState(null);
    const [topSellers, setTopSellers] = useState(null);

    useEffect(() => {
        // Fetch total purchases
        fetch('/api/stats/1-total-purchases')
            .then(response => response.json())
            .then(data => setTotalPurchases(data))
            .catch(error => console.error('Error fetching total purchases:', error));
        
        // Fetch buyers per state
        fetch('/api/stats/2-buyers-per-state')
            .then(response => response.json())
            .then(data => setBuyersPerState(data))
            .catch(error => console.error('Error fetching buyers per state:', error));

        // Fetch top products on sale
        fetch('/api/stats/3-top-products-on-sale')
            .then(response => response.json())
            .then(data => setTopProducts(data))
            .catch(error => console.error('Error fetching top products:', error));

        // Fetch average pricing
        fetch('/api/stats/4-average-pricing')
            .then(response => response.json())
            .then(data => setAveragePrice(data))
            .catch(error => console.error('Error fetching average pricing:', error));

        // Fetch sale info
        fetch('/api/stats/5-sold-to-unsold')
            .then(response => response.json())
            .then(data => setSaleInfo(data))
            .catch(error => console.error('Error fetching sale info:', error));

        // Fetch top sellers
        fetch('/api/stats/6-top-sellers')
            .then(response => response.json())
            .then(data => setTopSellers(data))
            .catch(error => console.error('Error fetching top sellers:', error));
    }, []);

    return (
      <div className = {styles.root}>
        <h1>STATISTICS</h1>
        <div className = {styles.parentBox}>

          <div className = {styles.outerBox}>
            <div className = {styles.infoBox}>
              <h1>Total Purchase Statistics</h1>
              {totalPurchases && (
                  <div>
                      <p>Total number of purchases: {totalPurchases.totalPurchases}</p>
                      <p>Total sum of product prices: {totalPurchases.totalPriceSum}</p>
                  </div>
              )}
            </div>
          </div>

          <div className = {styles.outerBox}>
            <div className = {styles.infoBox}>
              <h1>Buyers Per State</h1>
              {buyersPerState && (
                  <div>
                      <p>Buyers per state:</p>
                      <ul>
                          {buyersPerState.map(stateData => (
                              <li key={stateData.state}>{stateData.state}: {stateData._count.id}</li>
                          ))}
                      </ul>
                  </div>
              )}
            </div>
          </div>

          <div className = {styles.outerBox}>
            <div className = {styles.infoBox}>
              <h1>Top Products on Sale</h1>
              {topProducts && (
                  <div>
                      <p>Top products on sale:</p>
                      <ul>
                          {topProducts.map(product => (
                              <li key={product.type}>{product.type}: {product._count.id}</li>
                          ))}
                      </ul>
                  </div>
              )}
            </div>
          </div>

          <div className = {styles.outerBox}>
            <div className = {styles.infoBox}>
              <h1>Average Pricing</h1>
              {averagePrice && (
                  <div>
                      <p>Average product price: {averagePrice._avg.price}</p>
                  </div>
              )}
            </div>
          </div>

          <div className = {styles.outerBox}>
            <div className = {styles.infoBox}>
              <h1>Sale Info</h1>
              {saleInfo && (
                  <div>
                      <p>Total listings: {saleInfo.total_listings}</p>
                      <p>Number of sold: {saleInfo.sold}</p>
                      <p>Number of unsold: {saleInfo.unsold}</p>
                      <p>Sold/unsold ratio: {saleInfo.selling_success}</p>
                  </div>
              )}
            </div>
          </div>

          <div className = {styles.outerBox}>
            <div className = {styles.infoBox}>
              <h1>Top Sellers</h1>
              {topSellers && (
                  <div>
                      <p>Top sellers:</p>
                      <ul>
                          {topSellers.map(seller => (
                              <li key={`${Object.keys(seller)[0]}`}>{Object.keys(seller)[0]}: {Object.values(seller)[0]}</li>
                          ))}
                      </ul>
                  </div>
              )}
            </div>
          </div>
        </div>
          <div className={styles.buttonBox}>
            <Link href="/GuestHomePage.html">
              <button className = {styles.button}>Go to Guest Home Page</button>
            </Link>
          </div>
      </div>
    );
}

export default Page;