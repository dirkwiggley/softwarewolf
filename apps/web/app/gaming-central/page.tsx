'use client';

import { ImageWrapCard } from '@softwarewolf/ui/image-wrap-card';
import { PageHeader } from '@softwarewolf/ui/page-header';
import PageGuard from '../PageGuard';

export default function GamingCentralPage() {
  const bodText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel eros non nisl consequat cursus finibus id enim. Phasellus enim ante, cursus quis diam sit amet, varius accumsan erat. Vestibulum congue imperdiet arcu ut gravida. Proin eget velit est. Maecenas fermentum eros lorem, eget semper metus finibus eget. Cras ut nibh quis lacus sollicitudin ornare. Pellentesque vulputate vel erat nec mattis. Sed quis ornare nibh, sed gravida sapien. Mauris non lectus in orci finibus consequat aliquam in magna. Donec sit amet nunc vel tortor convallis sollicitudin. Praesent vitae placerat ex. Phasellus eget risus elementum, rutrum velit eget, cursus erat. Vivamus vitae iaculis purus. Cras porta ornare ligula non bibendum. Praesent laoreet pellentesque diam, ut finibus velit finibus at. Nunc malesuada neque risus, ut porttitor augue ultrices non. Quisque eu arcu nibh. In luctus tellus quis sapien lacinia, in dapibus ipsum rhoncus. Donec nisl ligula, varius et gravida sit amet, vulputate in metus. Aenean molestie nulla sit amet lorem placerat, a tempus diam finibus. Vestibulum tincidunt at nibh at maximus. Quisque tempor dolor vitae erat tincidunt, at rhoncus urna cursus. Integer quis lectus et eros aliquet luctus laoreet vitae nulla. Duis quis odio sed ante hendrerit viverra eu a odio. Fusce non neque at lorem vestibulum imperdiet. Pellentesque vel nisi enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer id enim id ipsum malesuada molestie ut eu justo. Proin gravida quam quis neque tempus blandit. Sed fringilla porttitor est. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque lacinia suscipit ipsum, ut sodales diam egestas eget. Vestibulum imperdiet risus leo, sed blandit massa tristique ut. Curabitur eu cursus elit. Aliquam erat volutpat. Nunc sed fringilla metus. Quisque in justo eu neque vulputate porttitor. Duis placerat mi semper dictum ultricies. Phasellus eget dui porta, gravida ligula laoreet, molestie nisi. Integer ante nulla, fringilla id est vel, ultrices fringilla metus. Vestibulum a lorem tincidunt, sollicitudin sapien non, tincidunt arcu. Aenean sed velit id ante luctus vestibulum. Maecenas tempus sagittis lectus, eget vehicula ipsum aliquet nec. Praesent vehicula cursus est, eu sollicitudin lorem consectetur in. Sed id semper massa, eu dictum odio. Sed imperdiet luctus tellus quis dignissim. Etiam orci erat, lobortis id hendrerit nec, luctus ac erat. Nulla eu ante vel purus placerat dictum sit amet at sem. Donec lobortis, sapien eu scelerisque efficitur, orci eros sodales enim, et pulvinar ipsum ex in est. Curabitur facilisis convallis turpis, sed gravida neque laoreet eu. Nullam consequat sollicitudin sem vitae volutpat. Nullam leo velit, volutpat sit amet tempor ac, euismod sit amet eros. Nam lectus metus, ullamcorper et massa a, sagittis vehicula ligula. Maecenas rutrum diam lacus, faucibus dignissim quam egestas sagittis. Mauris neque mi, varius blandit interdum at, hendrerit aliquet lectus. Donec at ligula a eros elementum semper eu tempor eros. Aliquam sed urna sit amet neque varius suscipit ut sit amet odio. Vestibulum egestas et sapien eget sodales. Quisque dolor lectus, auctor quis blandit sit amet, vestibulum id mi. Quisque rutrum interdum erat eu imperdiet. Sed vestibulum nunc nibh, quis aliquam orci volutpat pharetra. Fusce est dolor, aliquet vitae neque nec, bibendum varius odio. Quisque aliquam id mauris eget consequat. Morbi scelerisque placerat ligula, eu consequat velit sollicitudin id. Nulla scelerisque enim a felis aliquam tristique. Phasellus bibendum semper sodales. Vivamus in pretium libero, vel vulputate lectus. Integer volutpat mi in dui facilisis interdum. In a nunc nisi. Nam mauris elit, tincidunt vitae erat et, consectetur maximus augue. Pellentesque laoreet auctor tempus. Maecenas elementum quis massa quis egestas. Quisque bibendum, enim pretium finibus tristique, tortor ipsum dignissim dolor, ut placerat elit lorem ac risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc vulputate sem risus, a iaculis ligula blandit eget. Sed porta justo in hendrerit posuere. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer luctus, dui ac mattis sodales, est diam finibus augue, eu pretium nunc elit at ipsum"

  return (
    <PageGuard allowedRoles={['ADMIN', 'MANAGER', 'USER', 'GUEST']}>
      <PageHeader 
        title="Gaming Central" 
        description="Where we talk about, well game stuff." 
      />

      <div className="pt-2 px-8 pb-8 flex flex-col gap-8">
        <div className="w-full max-w-3xl mx-auto md:w-[60%]">
          <ImageWrapCard
            heading="System Fluidics Diagnostics (Mobile Bottom)"
            imageAlignment="center-right"
            imageUrl="/Everward_1.png"
            bodyText={bodText}
          />
        </div>

        <div className="w-full max-w-3xl mx-auto md:w-[60%]">
          <ImageWrapCard
            heading="Core Engine Analytics (Mobile Top)"
            imageAlignment="center-right"
            mobileImagePosition="top"
            imageUrl="/Everward_1.png"
            bodyText={bodText}
          />
        </div>
      </div>
    </PageGuard>
  );
}
