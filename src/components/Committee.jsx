import { useRef } from 'react'
import Lines from './Lines'
import { useReveal } from '../lib/scroll'
import { content, asset } from '../content'

function MemberCard({ member, featured = false, index }) {
  return (
    <article className={`committee__card${featured ? ' committee__card--featured' : ''}`} data-fade>
      <div className="committee__portrait">
        <img src={asset(member.image)} alt={`${member.name}, ${member.role}`} loading="lazy" decoding="async" />
        <span className="committee__index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="committee__caption">
        <p className="meta">{member.role}</p>
        <h3>{member.name}</h3>
        {member.description && <p className="committee__description">{member.description}</p>}
        {member.link && <a className="committee__contact" href={member.link} aria-label={`Contact ${member.name}`}>Contact ↗</a>}
      </div>
    </article>
  )
}

export default function Committee() {
  const r = useRef()
  useReveal(r)
  const executive = content.committee.filter((member) => member.group === 'Executive')
  const team = content.committee.filter((member) => member.group === 'Directors & Team')

  return (
    <section className="section committee" id="committee" ref={r} aria-label="RCGSC Committee 2026–27">
      <div className="committee__intro">
        <p className="meta" data-fade>Rotaract year · 2026–27</p>
        <Lines as="h1" className="display-xl" lines={['The people', 'behind the purpose.']} />
        <p className="lede committee__lede" data-fade>Meet the team shaping a year of service, fellowship and lasting impact.</p>
      </div>
      <div className="committee__executive" aria-label="Executive committee">
        {executive.map((member, i) => <MemberCard key={member.name} member={member} featured={i === 0} index={i} />)}
      </div>
      <div className="committee__team-head">
        <p className="meta" data-fade>Directors & team</p>
        <p className="committee__count" data-fade><span>{String(content.committee.length).padStart(2, '0')}</span> members · one shared purpose</p>
      </div>
      <div className="committee__team">
        {team.map((member, i) => <MemberCard key={member.name} member={member} index={executive.length + i} />)}
      </div>
      <div className="committee__avenues">
        <p className="meta" data-fade>Avenue heads</p>
        <ul className="committee__avenue-list">
          {content.avenues.map((avenue) => (
            <li key={avenue.n} data-fade>
              <h3>{avenue.title}</h3>
              <p>{avenue.relatedMembers.length
                ? avenue.relatedMembers.map((member) => `${member.name} · ${member.role}`).join(', ')
                : 'Avenue lead details will be added as they are confirmed.'}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
