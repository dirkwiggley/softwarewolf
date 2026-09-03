'use client';

import Link from 'next/link';
import PageGuard from '../PageGuard';
import { PageHeader } from '@softwarewolf/ui/page-header';
import { ImageWrapCard } from '@softwarewolf/ui/image-wrap-card';

export default function SoftwarewolfHome() {
  const bodText = `Hello and welcome to a collection of articles, ideas, and tools for use with various RPGs. There are also sections available to members of my gaming friends for scheduling, interparty communications, and other useful things. If you find anything here useful or have some suggestions please give me a shout out from the contact page.

I discovered gaming at a Kay Bee Toys at the local shopping mall with my best friend about ’78. We convinced his mom to buy the D&D White Box and we brought it home. We read through the 3 books and loved the idea but man, coaxing playable rules out them was nigh impossible. We played a couple of games, with his mom DMing (she was super cool) and us playing. We muddled through the rules but still had a couple of good games. While we were playing a bunch of supplements came out including Eldritch Wizardy, Blackmoor, and Greyhawk, which we picked up. Those shed some more light on a working rule set but it was still pretty wonky. Fortunately the basic set (Blue box) came out around then so we grabbed that, read it over and found a much more playable rule set plus REAL DICE. Mind you, they were crappy plastic dice and eventually wore down but it was a big step up from pulling carboard chits out of a box top. These rules ruled! They actually mostly worked. By now my buddy and I couldn’t wait for our Saturday games and we’d talk about earlier sessions at school all the time. Somewhere between there and high school the 1st Ed Advanced D&D books came out. So did high-impact plastic dice. Which was great because all of the dice from our basic box were just about spheres.

When we hit high school we found other geeks who were also into D&D but didn’t even know that AD&D existed so we showed them the books and joined their group. In a much bigger group the games got even better though we all lacked basic social skills so things didn’t always work out. My best friend moved away and it was the group I found in school and me, the new guy. I was having fun but it wasn’t working out perfectly.

If you’re new to gaming or been around awhile you might not have given much thought to the question ‘why am I gaming?’. I never asked myself that question until the first big blow up in my gaming group. Sure, we were having fun but some tensions between gaming and GMing styles were ramping up and eventually we had it out right there, right then. Grievances were aired but nothing approaching a resolution came up so we went home and took some time off from gaming. Mind you we were all teenagers and it was the 80’s so ‘talking things out’ was not a thing that people did much less kids so we all stayed in our corners until the negotiator of the group rounded everyone back up and got a game scheduled. Individuals reached out to one another before that and mostly smoothed things out and in our next session we just acted like nothing happened. Before that though I was wondering what the heck I was doing with these guys. I mean, I loved the game so I started thinking about why I wanted to play. Back then it was just for love of the game but that was enough to keep going.

I went to my first gaming convention, DunDraCon where I met some gamers. They were mostly a bit older than me but I was local so I was invited into their group. They played D&D and a bunch of other systems (Hero System, Traveller, Space Opera, and others). We talked comic books, animae, sci-fi. It was a lot of fun. Some of the gamers in this group were also in other groups and eventually this group died out.

Shortly after that I met a great bunch of guys who liked my DMing. We decided to keep in touch. I started playing with them more until the new group became my group. These guys were a tight knit group but they were inclusive. We could viciously mock each other one minute then ask the victim if they wanted something from the fridge the next. These were my guys. We still game and insult each other to this day. There was little friction between this group and when there was someone would step in, calm things down, and make nice. It also helped that I was a couple years older and learning about getting along with people. With these guys it wasn’t just about gaming, we were joking, eating, talking about books and movies and making memories. We’d bring up great moments in gaming, heroic or stupid and laugh our heads off. We were a group, we were having a great time, but like I said we were making memories.

A session didn’t go by where someone would bring up some great one-liners made in a previous game. And the jokes sometime brough tears to our eyes. And through it all we really came together. Between games we shared real life success, failures, helped each out out when we needed it and even sometimes when it wasn’t asked for but still needed. I couldn’t begin to describe when these folks mean to me but I’m so glad they’re still here. This is why I game.`

  return (
    <PageGuard allowedRoles={['ADMIN', 'MANAGER', 'USER', 'GUEST']}>
      <PageHeader
        title="Softwarewolf Home"
        description="We're here for the hobby."
      />

      <div className="pt-2 px-8 pb-8 flex flex-col gap-8">
        <div className="w-full max-w-3xl mx-auto md:w-[60%]">
          <ImageWrapCard
            heading="Gaming Experiences: Tips and Ideas from a Veteran DM"
            imageAlignment="center-right"
            imageUrl="/Everward_1.png"
            bodyText={bodText}
            maxImageWidth='w-100'
          />
        </div>
      </div>

      {/* Outer structural layout wrapper that covers the viewport width and centers its children horizontally */}
      <div className="flex w-full justify-center px-6 py-16">

        {/* Inner content box that maintains the strict left alignment format for your grid matrix */}
        <div className="w-full max-w-4xl text-left">

          {/* Dynamic Section Matrix Layout */}
          <main className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {/* General Gaming Section */}
            <section className="wolf-panel flex flex-col justify-between border-dashed" style={{ borderColor: 'var(--color-wolf-border)' }}>
              <div>
                <div className="mb-4 inline-flex items-center">
                  <span className="role-badge-guest">Public Access</span>
                </div>
                <h2 className="text-xl font-bold tracking-tight mb-2">General Gaming</h2>
                <p className="text-sm opacity-60 mb-6 leading-relaxed">
                  My collected thoughts on gaming, art, and other nonsense.
                </p>
              </div>
              <div className="w-full text-center py-2 text-xs font-semibold uppercase tracking-wider opacity-40">
                Under Construction
              </div>
            </section>

          </main>
        </div>

      </div>
    </PageGuard>
  );
}
