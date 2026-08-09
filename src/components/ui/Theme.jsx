import React from 'react'

export default function Theme() {
    const handleChangeTheme = () => {
        let root = document.getElementById('body_id')
        let theme = document.querySelector('.theme_mode')
        if (root.classList.contains('dark')) {
            root.classList.remove('dark')
            theme.classList.remove('bi-moon-fill')
            theme.classList.add('bi-sun-fill')
        }
        else {
            root.classList.add('dark')
            theme.classList.remove('bi-sun-fill')
            theme.classList.add('bi-moon-fill')
        }
    }
    return (
        <button className='theme' onClick={handleChangeTheme}>
            <i className="bi bi-sun-fill theme_mode"></i>
        </button>
    )
}
