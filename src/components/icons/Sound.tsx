const SoundIcon = ({ on = true }: { on: boolean }) => {
  return (
    <svg
      width='34'
      height='33'
      viewBox='0 0 34 33'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M19.3822 3L17.8675 3.97158L8.82415 9.81017H0V26.1796L8.82415 26.1799L19.3826 33L19.3822 3ZM26.363 5.23209L25.3338 7.42722L26.232 8.06259C29.1422 10.0983 30.9372 13.8843 30.9372 17.9946C30.9372 22.1057 29.1424 25.8988 26.232 27.9346L25.3338 28.5601L26.355 30.7578L27.2534 30.13C30.8044 27.6462 33 23.0113 33 17.995C33 12.9791 30.8042 8.34144 27.2534 5.85789L26.363 5.23209ZM17.3197 7.18508V28.8044L9.33348 23.6455H2.06213V12.3415H9.33348L17.3197 7.18508ZM22.3432 11.3329L21.6885 13.7332L22.6715 14.136C24.0276 14.6917 24.9313 16.2402 24.9313 17.9948C24.9313 19.7495 24.0276 21.2979 22.6715 21.8535L21.6885 22.2541L22.3432 24.6569L23.3181 24.2541C25.5086 23.3568 26.994 20.8292 26.994 17.9951C26.994 15.1612 25.5084 12.6336 23.3181 11.7361L22.3432 11.3329Z'
        fill='#F3EEED'
      />
      {on || (
        <rect
          x='3.90381'
          y='0.647705'
          width='42.3551'
          height='2'
          transform='rotate(46.5862 3.90381 0.647705)'
          fill='#F3EEED'
        />
      )}
    </svg>
  )
}

export default SoundIcon