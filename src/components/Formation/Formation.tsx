import styles from './Formation.module.scss'

export type Props = {
  name: string
  school: string
  description: string[]
  date: [number, number?] // [start, end?] as years
}

const Formation = ({ name, school, description, date: [start, end] }: Props) => (
  <article className={styles.container} aria-label='Formation'>
    <p>{start + (end ? ` - ${ end }` : '')}</p>
    <h5>{name}</h5>
    <h6>{school}</h6>
    <ul>
      {description.map((el, index) =>
        <li key={`listItem-${school.replaceAll(' ', '_')}-${index}`}>{el}</li>
      )}
    </ul>
  </article>
)

export default Formation