import React from 'react';

import styles from './homepage.module.css';

export const metadata = {
    title: 'Not found',
};

function NotFound() {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.mainHeading}>
                Page not found.
            </h1>

            <p>The page does not exist. Please check the URL and try again.</p>
        </div>
    );
}

export default NotFound;
