'use client';

import { PageHeader } from '@softwarewolf/ui/page-header';
import PageGuard from "../../../../PageGuard";
import { SectionHeader } from '@softwarewolf/ui/sectionHeader';

export default function AdventuresInEverward() {

  // Standardized classes for full mobile width and expanded desktop width
  const sectionClass = "w-full max-w-5xl mx-0 md:mx-auto md:w-[85%] bg-[url('/parchment.jpg')] bg-cover bg-center p-6 md:p-8 rounded-none md:rounded-lg shadow-md mb-6";

  return (
    <PageGuard allowedRoles={['ADMIN', 'MANAGER', 'USER', 'GUEST']}>
      <PageHeader
        title="Adventures in Everward"
        description="Initial campaign notes."
      />

      {/* Wrapping the content blocks inside a main tag provides structured page-level layout constraints */}
      <main className="py-4 flex flex-col">

        {/* Overview Section */}
        <div className={sectionClass}>
          <SectionHeader
            title="Overview"
            subtitle="First time players should read this."
          />
          <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed opacity-95">
            <p>Everward is a high fantasy setting with many elements familiar to role players or readers of
              fantasy fiction. Most of the action in the games will take place in the kingdom of Everward,
              a mainly human populated kingdom with a mix of most of the worlds other species. Everward
              itself is styled as a fantasy medieval kingdom with it’s capital, Everward, the largest
              city-state of several. Each of the other city-states are allowed their own form of governance
              so long as they obey the laws of Everward. The current king and kings of the past have
              delegated much authority to a Parliament with two Lords from each city. One Lord is appointed
              by the King and the other is appointed by the city-state. The Parliament meets for a month
              every year in Everward to do the kingdom’s business at the Royal Moot. The majority of laws in
              the kingdom are in regards to trade and mutual protection as kings of the past have wisely
              decided to rule with a light hand and diplomacy.</p>
            <p>Magic is relatively common with low level magics being employed throughout the kingdom in the
              form of alchemists and herbalists who dispense simple healing potions and poultices to hedge
              mages who practice magics for hire in out of the way places to druids who practice nature
              magics and guard important sites. Potent mages with large catalogs of spells do exist but are
              quite rare. One such wizard is known Graemane, whose tower is located in the far North East of
              the kingdom. Gramane or his confidants are known to travel to the various city-states on
              important business from time to time. Additionally, several mages teach at the university in
              Everward. Low powered magic items are common place with the most prolific being potions and
              limited use items of various sort created by alchemists, hedge mages, or simple mages who have
              set up shop and produce simple items in quantity for sale in towns. Powerful items such as
              famous swords or armor are rarely produced as the materials required to produce them are rare
              as is the skill required to make them. Many verified stories exist of lesser items being
              reforged, recast, or recombined into more powerful items under auspicious circumstances.</p>
          </div>
        </div>

        <div className={sectionClass}>
          <SectionHeader
            title="Species"
            subtitle="A bit about the playable races."
          />
          <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed opacity-95">
            <p>The species most commonly seen throughout the kingdom in order of occurrence are: humans, half
              elves, gnomes, halflings, dwarves, half orcs, orcs, tieflings, wild elves, lizard folk. Citizens
              throughout the kingdom have slightly differing cultures as each city-state is unique though they
              are similar enough that anyone traveling from one to another would not feel like a complete
              foreigner. There is a common language used throughout the kingdom, simply referred to as the
              common tongue, though slang will vary by location and languages of immigrant species might be
              used from time to time. A certain degree of conformity is expected of all citizens, some of
              which is enforced by law, and those with strong feelings about culture often settle in parts
              of towns (often ghettos) or small settlements what welcome those from that species.</p>
            <p>Humans are the most prevalent of the species by a large margin and their presence is felt even
              in communities where humans are rare. The common tongue is required in all mercantile
              transactions if requested and discrimination in matters of business are illegal (though not
              always enforced). Human culture could be largely considered to be locally focused groups who are
              more or less tolerant of outsiders depending on how much trade is done within their borders. The
              kingdom has been organized over the years to encourage trade in part to improve integration and
              in most cases has been successful in it’s efforts.</p>
            <p>Elves are descendants of the Fae who have managed to remain in this realm. They have lost most
              of their Fae powers and have rejected Fae culture. Half elves are the offspring of elves or half
              elves and another species. It is extraordinarily rare to meet a half elf that has been raised by
              elves. When one is encountered it is safe to assume that it was raised outside of elven culture.
              Half elves will assume the culture in which they were raised. They will be more or less accepted
              depending on the attitudes of the prevailing population.</p>
            <p>Gnomes are a small but industrious folk, often absorbed in their own interests. Usually
              specialists in a specific field of endeavor they consider generalists to be lazy, uninformed, or
              simple minded. They do integrate well into most communities and will accept local customs. Gnomes
              tend towards occupations that require a lot of study or practice (i.e., engineer or gem cutter).
              Tedious physical labor is disregarded in gnomish society.</p>
            <p>Halflings pursue a slow pace of life. That’s not to say that a halfling does not strive for great
              works or accomplishments but that they usually do not sacrifice their well being to achieve their
              ends. It is quite possible to find a halfling master craftsman, just not during a holiday. Family
              and community oriented they will know everyone in their neighborhood and tend to treat outsiders
              with suspicion. They are often good natured and enjoy the outdoors and outdoor activities.</p>
            <p>Dwarves are a sturdy folk who believe in hard work and the benefits that it entails. Competitive
              by nature, being the best at something is a great source of pride for a dwarf. Most dwarves can
              easily get along with other species though they will often remind others of how or why a dwarf
              will accomplish a task better than they would. A dwarf will also stand by a prediction, a promise,
              or a deal under most circumstance as reputation is as important to a dwarf as wealth. Dwarves will
              often sacrifice wealth to increase their reputation.</p>
            <p>Half orcs are the offspring of orcs and another species. They may be raised in either culture but
              are often at a great disadvantage as in orcish cultures they are considered weak and in other
              cultures they are considered brutish. Suffering through this usually makes half orcs difficult to
              deal with as they tend to have a chip on their shoulder, expecting to have to prove themselves at
              every turn. There are exceptions but such individuals are usually the result of an unconventional
              upbringing.</p>
            <p>Orcs can be found among other species. Orc tribes are not always at war with the outside world
              despite popular opinion. Though distrust between orcs and outsiders is generally so bad that there
              are few places where orcs and other cultures meet. When orcs mingle with others they can count on
              a high price for their strength and endurance and can be hired for martial skill or task involving
              hard labor. In any case, it will not be for a long term as orcs naturally gravitate back to clan
              lands over time.</p>
            <p>Tieflings are demon spawn. Any child born anywhere could possibly be born a tiefling. It is usually
              because of some deal made by ancestors or parents such that the price of some service is that an
              offspring will become a spawn of that demon. A confluence of supernatural events could also be the
              cause though whatever the cause, the result is in a child with no blood relation to the parents who
              bore it. These unfortunate beings are usually shunned and abandoned by most. Those who survive often
              congregate for mutual protection. Due to their demonic heritage they will all have a random
              appearance that my include horns, wings, scales, feathers, hooves, tails, or any combination of the
              above and more. Any tiefling whose real parent (it will only have 1 ‘real’ parent) is a powerful
              demon will also possess one or more natural powers.</p>
            <p>Also called high elves or the faerie the Fae are creatures who do not live in the world but in the
              Fae, a magical plane adjacent to the prime material. They sometimes venture onto the prime material
              but only to complete some specific task. The Fae are immortal and have a thought process wholly
              alien to any culture on the prime. They are considered ruthless tricksters and monsters by most. An
              encounter with one would be considered by most to be terrifying and life threatening.</p>
          </div>
        </div>

        <div className={sectionClass}>
          <SectionHeader
            title="Everward"
            subtitle="A tiny bit of info on the country of Everward."
          />
          <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed opacity-95">
            <p>Everward is a kingdom consisting of seven city-states on the coast (Mossgard, Breadwardine, Helmfirth,
              Eldham, Everward, Shrieveport, and Eastguard) , three on the isle of Shieldwall (Wavemeet, Blackburn,
              and Westguard), one on the ilse of Whitecliff (Wrights Landing), six inland (Redwater, Brie, Vinehill,
              Briar Glen, Raven Hill, and Fulcairn) two protectorate towns (Hotspring and Cliffwind), and four
              landed manors (Pike’s Head, Skiewatch, Bannerman’s Castle, and Southshield). Everward has been blessed
              with a natural barrier of mountains and forests that frame it’s Northern and Eastern borders. The
              protective terrain has kept the country free from most external strife for many years. In that time
              trade has boomed and Everward has been able to take advantage of it’s timber, fertile land, and mineral
              resources.
            </p>
            <p>The capital of Everward is the largest of the city-states and the residence of the current king, Monroe
              the Fat (which is more a reference to his wealth than this physical shape). It is also the home of most
              of the countries guilds.</p>
          </div>
        </div>
      </main>
    </PageGuard >
  );
}
