// "use client";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import {
  Checkbox,
  Select,
  Stack,
  Text,
  Heading,
  Code,
  ButtonGroup,
} from "@/utils/@chakraui/wrapper";
import { useSession } from "next-auth/react";
import axios from "axios";
import { MousePointerClick, PenLine } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/db/prisma.client";
import { PostItem } from "@/components/PostItem";

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { status: "public" },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      content: true,
      featured_image: true,
      slug: true,
      blogSlug: true,
      updatedAt: true,
    },
  });

  return (
    <div className="!scroll-smooth p-4">
      <section className="prose flex min-h-[400px] w-full max-w-none items-center justify-between bg-slate-100 p-12">
        <div className="w-1/2">
          <h1>Blogger - Read & Create Blogs</h1>
          <p>
            Blogger is your tech oasis to chill and explore. Dive into cool tech
            blogs, kick back, and expand your digital horizons
          </p>
          <div className="flex gap-2 ">
            {/*
            <Button
              className="rounded-full text-sm"
              leftIcon={<MousePointerClick width={20} />}
              tabIndex={-1}
            >
              <a href="#explore" className="text-white no-underline">
                Explore
              </a>
            </Button>
            <Button
              className="rounded-full text-sm"
              leftIcon={<PenLine width={18} />}
              tabIndex={-1}
            >
              <Link href="/login" className="text-white no-underline">
                Create Blog
              </Link>
            </Button>
           * */}
          </div>
        </div>
        <div className="flex w-1/2 items-center justify-center">
          <svg
            className="w-4/5"
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            viewBox="0 0 983 471.14931"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="M333.73228,626.16487c2.4313-19.55045,14.5476-38.81332,33.19282-45.17557a90.77027,90.77027,0,0,0,.0045,62.31993c2.865,7.74986,6.85862,16.07126,4.16366,23.882-1.67677,4.86-5.77877,8.57837-10.364,10.90336-4.58549,2.325-9.67443,3.43311-14.69967,4.51907l-.989.818C337.06312,665.418,331.301,645.71532,333.73228,626.16487Z"
              transform="translate(-108.5 -214.42534)"
              fill="#f0f0f0"
            />
            <path
              d="M367.11012,581.359a77.58416,77.58416,0,0,0-19.2873,43.66434,33.41024,33.41024,0,0,0,.38,10.46122,19.16244,19.16244,0,0,0,4.76592,8.8879c2.1481,2.36012,4.61869,4.52551,6.15567,7.36671a11.73315,11.73315,0,0,1,.57323,9.57851c-1.357,3.89211-4.03157,7.06451-6.75489,10.076-3.02373,3.34364-6.21741,6.76873-7.50272,11.20152-.15574.53709-.98.264-.82452-.27224,2.23622-7.71229,9.72281-12.093,13.29315-19.03937,1.666-3.2413,2.36526-7.0043.80343-10.42582-1.36576-2.992-3.91154-5.22713-6.1072-7.598a20.44792,20.44792,0,0,1-4.98384-8.51683,30.88724,30.88724,0,0,1-.78083-10.408,75.27053,75.27053,0,0,1,5.49731-22.87407,78.96,78.96,0,0,1,14.198-22.753c.37126-.41573.94337.23821.57454.65122Z"
              transform="translate(-108.5 -214.42534)"
              fill="#fff"
            />
            <path
              d="M348.05654,619.76868a11.64011,11.64011,0,0,1-8.86041-12.19344c.04424-.55691.91173-.51433.86743.04333a10.77848,10.77848,0,0,0,8.26522,11.32559c.54357.12924.26822.953-.27224.82452Z"
              transform="translate(-108.5 -214.42534)"
              fill="#fff"
            />
            <path
              d="M351.722,643.3192a22.43534,22.43534,0,0,0,10.01872-12.92111c.15763-.53653.982-.26364.82452.27224a23.33615,23.33615,0,0,1-10.45272,13.42439c-.48149.28561-.86939-.49146-.39052-.77552Z"
              transform="translate(-108.5 -214.42534)"
              fill="#fff"
            />
            <path
              d="M356.54371,595.94486a6.58885,6.58885,0,0,0,6.244-.317c.47763-.29156.865.48586.39052.77553a7.38339,7.38339,0,0,1-6.90677.366.44875.44875,0,0,1-.27614-.54838.43634.43634,0,0,1,.54838-.27614Z"
              transform="translate(-108.5 -214.42534)"
              fill="#fff"
            />
            <path
              d="M423.75835,615.90878c-.29306.19054-.58612.38108-.87954.579a86.77175,86.77175,0,0,0-11.09474,8.662c-.27123.24185-.54246.491-.80618.74017a91.47663,91.47663,0,0,0-19.86683,27.19523,88.83458,88.83458,0,0,0-4.86607,12.59c-1.79557,5.95789-3.26838,12.56062-6.82266,17.43393a15.24068,15.24068,0,0,1-1.18727,1.46566H346.11521c-.073-.03664-.14635-.066-.21971-.10261l-1.28244.05864c.05152-.22718.10985-.46169.16137-.68886.02935-.1319.06584-.26381.09519-.39571.02182-.08794.044-.17592.05868-.25652.00716-.02929.01467-.05859.02183-.0806.01467-.0806.03685-.15391.05152-.22717q.4836-1.96763.99655-3.93528c0-.00733,0-.00733.00715-.01467a130.62,130.62,0,0,1,10.99241-28.85872c.1467-.27114.29306-.54962.45443-.82076a84.76837,84.76837,0,0,1,7.61418-11.54936,74.937,74.937,0,0,1,4.99059-5.7087,62.31722,62.31722,0,0,1,15.59439-11.68127c11.5202-6.08245,24.85743-8.41283,37.16914-4.6974C423.13537,615.711,423.44346,615.80617,423.75835,615.90878Z"
              transform="translate(-108.5 -214.42534)"
              fill="#f0f0f0"
            />
            <path
              d="M423.68614,616.31645a77.58412,77.58412,0,0,0-41.68879,23.25124,33.41027,33.41027,0,0,0-5.99493,8.58151,19.16232,19.16232,0,0,0-1.54581,9.9659c.29418,3.17774.96309,6.39414.47969,9.58805a11.73317,11.73317,0,0,1-5.30923,7.993c-3.42681,2.29063-7.47231,3.21334-11.45984,3.97819-4.42737.84922-9.03949,1.66115-12.73459,4.42663-.44771.33508-.94146-.37921-.49442-.71379,6.42883-4.81146,15.04395-3.80179,22.07685-7.19847,3.28169-1.585,6.1056-4.16849,6.91856-7.84072.71089-3.2112.02394-6.52858-.30173-9.74353a20.44771,20.44771,0,0,1,1.14839-9.80082,30.88731,30.88731,0,0,1,5.64289-8.78033,75.27048,75.27048,0,0,1,18.16107-14.95391,78.96,78.96,0,0,1,25.03523-9.61885c.54672-.10841.60981.75817.06666.86588Z"
              transform="translate(-108.5 -214.42534)"
              fill="#fff"
            />
            <path
              d="M385.34762,635.51288a11.64011,11.64011,0,0,1,.26674-15.07036c.37063-.418,1.03764.13827.66652.55685a10.77847,10.77847,0,0,0-.21948,14.01908c.35621.43046-.35962.92242-.71378.49443Z"
              transform="translate(-108.5 -214.42534)"
              fill="#fff"
            />
            <path
              d="M374.09524,656.52351a22.43534,22.43534,0,0,0,15.77879-4.28482c.44889-.33348.94277.38071.49443.71378a23.33612,23.33612,0,0,1-16.42833,4.42537c-.55639-.06184-.39826-.91584.15511-.85433Z"
              transform="translate(-108.5 -214.42534)"
              fill="#fff"
            />
            <path
              d="M406.46773,621.60075a6.58886,6.58886,0,0,0,5.17633,3.50625c.5569.05476.39816.90874-.15511.85433a7.38333,7.38333,0,0,1-5.735-3.86615.44874.44874,0,0,1,.10968-.60411.43635.43635,0,0,1,.6041.10968Z"
              transform="translate(-108.5 -214.42534)"
              fill="#fff"
            />
            <path
              d="M911.84,633.07869c-2.10189-16.90159-12.57658-33.55458-28.69559-39.05482a78.472,78.472,0,0,1-.00389,53.87633c-2.47687,6.69985-5.92936,13.8938-3.59953,20.64623,1.44959,4.20155,4.99581,7.41611,8.95978,9.42608,3.96421,2.01,8.36365,2.968,12.708,3.9068l.855.70713C908.96043,667.01346,913.94188,649.98029,911.84,633.07869Z"
              transform="translate(-108.5 -214.42534)"
              fill="#f0f0f0"
            />
            <path
              d="M882.98444,594.34345a67.07247,67.07247,0,0,1,16.6741,37.74836,28.88345,28.88345,0,0,1-.32855,9.04384,16.56617,16.56617,0,0,1-4.12019,7.6837c-1.85706,2.04035-3.99291,3.91236-5.32166,6.36861a10.14348,10.14348,0,0,0-.49556,8.28073c1.17315,3.36478,3.48535,6.10736,5.83969,8.7108,2.61405,2.89062,5.375,5.85165,6.48619,9.68385.13463.46432.84724.22827.71281-.23536-1.93325-6.66736-8.40549-10.45455-11.49209-16.45976-1.44027-2.80214-2.0448-6.0553-.69457-9.01325,1.18071-2.58659,3.38157-4.51891,5.27974-6.56856a17.67732,17.67732,0,0,0,4.30859-7.36289,26.70235,26.70235,0,0,0,.675-8.99785,65.07238,65.07238,0,0,0-4.7525-19.77492,68.26152,68.26152,0,0,0-12.27435-19.67028c-.321-.3594-.81555.20593-.49669.563Z"
              transform="translate(-108.5 -214.42534)"
              fill="#fff"
            />
            <path
              d="M899.45649,627.54911a10.063,10.063,0,0,0,7.65993-10.54137c-.03825-.48146-.78821-.44464-.74991.03746a9.3181,9.3181,0,0,1-7.14538,9.7911c-.46992.11173-.23188.8239.23536.71281Z"
              transform="translate(-108.5 -214.42534)"
              fill="#fff"
            />
            <path
              d="M896.28766,647.90882a19.39558,19.39558,0,0,1-8.66131-11.17046c-.13628-.46383-.84892-.22791-.71281.23536a20.17438,20.17438,0,0,0,9.03651,11.60555c.41625.24691.75159-.42488.33761-.67045Z"
              transform="translate(-108.5 -214.42534)"
              fill="#fff"
            />
            <path
              d="M892.11923,606.95314a5.69618,5.69618,0,0,1-5.398-.274c-.41291-.25206-.74783.42-.3376.67045a6.383,6.383,0,0,0,5.971.31638.38794.38794,0,0,0,.23873-.47408.37721.37721,0,0,0-.47408-.23872Z"
              transform="translate(-108.5 -214.42534)"
              fill="#fff"
            />
            <path
              d="M834.01137,624.21218c.25335.16473.5067.32945.76037.50052a75.0155,75.0155,0,0,1,9.59153,7.48838c.23448.20908.469.4245.69695.63988a79.0826,79.0826,0,0,1,17.17512,23.51061,76.79879,76.79879,0,0,1,4.20678,10.88417c1.55229,5.15066,2.82555,10.8588,5.89827,15.07184a13.17429,13.17429,0,0,0,1.0264,1.26708h27.768c.06311-.03167.12652-.057.18994-.08871l1.10869.0507c-.04454-.1964-.095-.39914-.13951-.59553-.02537-.114-.05692-.22807-.08229-.3421-.01887-.076-.038-.15208-.05073-.22176-.00619-.02533-.01268-.05065-.01887-.06968-.01268-.06968-.03186-.13306-.04455-.19639q-.41808-1.701-.86152-3.4021c0-.00634,0-.00634-.00619-.01268a112.92231,112.92231,0,0,0-9.50306-24.94871c-.12683-.23441-.25335-.47515-.39287-.70956a73.28382,73.28382,0,0,0-6.58254-9.98456,64.78468,64.78468,0,0,0-4.31443-4.93524,53.874,53.874,0,0,0-13.48154-10.09859c-9.95935-5.25836-21.48954-7.273-32.13316-4.061C834.54994,624.04115,834.28359,624.12348,834.01137,624.21218Z"
              transform="translate(-108.5 -214.42534)"
              fill="#f0f0f0"
            />
            <path
              d="M834.07379,624.56461a67.07251,67.07251,0,0,1,36.04046,20.101,28.88365,28.88365,0,0,1,5.18269,7.41881,16.5661,16.5661,0,0,1,1.33637,8.61564c-.25432,2.74719-.8326,5.52782-.4147,8.289a10.1435,10.1435,0,0,0,4.5899,6.91006c2.96252,1.98027,6.4599,2.778,9.90716,3.43919,3.82752.73416,7.81476,1.43608,11.00921,3.82688.38705.28967.8139-.32784.42743-.61708-5.5578-4.15957-13.00568-3.28669-19.0857-6.22317-2.83706-1.37021-5.27837-3.60371-5.98117-6.77839-.61458-2.77612-.0207-5.644.26084-8.4234a17.67717,17.67717,0,0,0-.9928-8.47293,26.70252,26.70252,0,0,0-4.87834-7.5907,65.0722,65.0722,0,0,0-15.70047-12.92783,68.26185,68.26185,0,0,0-21.64325-8.31562c-.47264-.09372-.52719.65545-.05763.74856Z"
              transform="translate(-108.5 -214.42534)"
              fill="#fff"
            />
            <path
              d="M867.2179,641.16016a10.063,10.063,0,0,0-.2306-13.0285c-.32041-.36139-.89705.11953-.57621.4814a9.31813,9.31813,0,0,1,.18974,12.11966c-.30794.37214.31089.79744.61707.42744Z"
              transform="translate(-108.5 -214.42534)"
              fill="#fff"
            />
            <path
              d="M876.94572,659.3241a19.39564,19.39564,0,0,1-13.641-3.70428c-.38806-.28829-.815.32913-.42743.61708a20.17437,20.17437,0,0,0,14.20248,3.82578c.481-.05346.34431-.79175-.13409-.73858Z"
              transform="translate(-108.5 -214.42534)"
              fill="#fff"
            />
            <path
              d="M848.95931,629.133a5.69614,5.69614,0,0,1-4.475,3.0312c-.48144.04734-.34421.78561.1341.73858a6.383,6.383,0,0,0,4.958-3.34234.388.388,0,0,0-.09482-.52226.37723.37723,0,0,0-.52226.09482Z"
              transform="translate(-108.5 -214.42534)"
              fill="#fff"
            />
            <path
              d="M969.79957,248.56984H316.31185a.94846.94846,0,0,1,0-1.89692H969.79957a.94846.94846,0,1,1,0,1.89692Z"
              transform="translate(-108.5 -214.42534)"
              fill="#cacaca"
            />
            <circle cx="229.15963" cy="10.43304" r="10.43304" fill="#3f3d56" />
            <circle cx="265.20104" cy="10.43304" r="10.43304" fill="#3f3d56" />
            <circle cx="301.24245" cy="10.43304" r="10.43304" fill="#3f3d56" />
            <path
              d="M948.20534,220.8069H922.597a1.89691,1.89691,0,0,1,0-3.79383h25.60837a1.89692,1.89692,0,1,1,0,3.79383Z"
              transform="translate(-108.5 -214.42534)"
              fill="#3f3d56"
            />
            <path
              d="M948.20534,227.92034H922.597a1.89692,1.89692,0,0,1,0-3.79384h25.60837a1.89692,1.89692,0,1,1,0,3.79384Z"
              transform="translate(-108.5 -214.42534)"
              fill="#3f3d56"
            />
            <path
              d="M948.20534,235.03377H922.597a1.89691,1.89691,0,0,1,0-3.79383h25.60837a1.89692,1.89692,0,1,1,0,3.79383Z"
              transform="translate(-108.5 -214.42534)"
              fill="#3f3d56"
            />
            <rect
              x="705.02428"
              y="74.81618"
              width="136.57799"
              height="81.88702"
              fill="#00bfa6"
            />
            <path
              d="M922.85417,408.74726H841.59056a3.82764,3.82764,0,0,1,0-7.65527h81.26361a3.82763,3.82763,0,0,1,0,7.65527Z"
              transform="translate(-108.5 -214.42534)"
              fill="#e4e4e4"
            />
            <path
              d="M909.75188,395.645h-55.059a3.82764,3.82764,0,1,1,0-7.65527h55.059a3.82764,3.82764,0,1,1,0,7.65527Z"
              transform="translate(-108.5 -214.42534)"
              fill="#e4e4e4"
            />
            <rect
              x="705.02428"
              y="223.72412"
              width="136.57799"
              height="81.88702"
              fill="#f0f0f0"
            />
            <path
              d="M922.85417,557.6552H841.59056a3.82763,3.82763,0,0,1,0-7.65526h81.26361a3.82763,3.82763,0,0,1,0,7.65526Z"
              transform="translate(-108.5 -214.42534)"
              fill="#e4e4e4"
            />
            <path
              d="M909.75188,544.55292h-55.059a3.82763,3.82763,0,1,1,0-7.65527h55.059a3.82763,3.82763,0,1,1,0,7.65527Z"
              transform="translate(-108.5 -214.42534)"
              fill="#e4e4e4"
            />
            <path
              d="M743.48842,346.6552H331.22481a3.82763,3.82763,0,0,1,0-7.65526H743.48842a3.82763,3.82763,0,0,1,0,7.65526Z"
              transform="translate(-108.5 -214.42534)"
              fill="#e4e4e4"
            />
            <path
              d="M743.48842,375.6552H331.22481a3.82763,3.82763,0,0,1,0-7.65526H743.48842a3.82763,3.82763,0,0,1,0,7.65526Z"
              transform="translate(-108.5 -214.42534)"
              fill="#e4e4e4"
            />
            <path
              d="M743.48842,404.6552H331.22481a3.82763,3.82763,0,0,1,0-7.65526H743.48842a3.82763,3.82763,0,0,1,0,7.65526Z"
              transform="translate(-108.5 -214.42534)"
              fill="#e4e4e4"
            />
            <path
              d="M743.48842,433.6552H331.22481a3.82763,3.82763,0,0,1,0-7.65526H743.48842a3.82763,3.82763,0,0,1,0,7.65526Z"
              transform="translate(-108.5 -214.42534)"
              fill="#e4e4e4"
            />
            <path
              d="M743.48842,491.6552H331.22481a3.82763,3.82763,0,0,1,0-7.65526H743.48842a3.82763,3.82763,0,0,1,0,7.65526Z"
              transform="translate(-108.5 -214.42534)"
              fill="#e4e4e4"
            />
            <path
              d="M743.48842,520.6552H331.22481a3.82763,3.82763,0,0,1,0-7.65526H743.48842a3.82763,3.82763,0,0,1,0,7.65526Z"
              transform="translate(-108.5 -214.42534)"
              fill="#e4e4e4"
            />
            <path
              d="M675.38613,317.55292H399.3271a3.82764,3.82764,0,1,1,0-7.65527h276.059a3.82764,3.82764,0,1,1,0,7.65527Z"
              transform="translate(-108.5 -214.42534)"
              fill="#e4e4e4"
            />
            <polygon
              points="672.663 462.791 680.633 462.791 684.425 432.047 672.662 432.048 672.663 462.791"
              fill="#ffb6b6"
            />
            <path
              d="M779.12988,674.614l15.69674-.00064h.00064a10.00373,10.00373,0,0,1,10.00319,10.003v.32507l-25.70009.00095Z"
              transform="translate(-108.5 -214.42534)"
              fill="#2f2e41"
            />
            <polygon
              points="631.925 462.791 639.895 462.791 643.687 432.047 631.923 432.048 631.925 462.791"
              fill="#ffb6b6"
            />
            <path
              d="M738.39153,674.614l15.69674-.00064h.00064a10.00373,10.00373,0,0,1,10.00319,10.003v.32507l-25.70009.00095Z"
              transform="translate(-108.5 -214.42534)"
              fill="#2f2e41"
            />
            <path
              d="M833.49818,334.62762a9.053,9.053,0,1,0-17.42593,3.4387l-18.31664,28.97955-11.40241,22.9796,9.40955,8.35142,7.24134-7.62131,23.683-47.36618A9.04794,9.04794,0,0,0,833.49818,334.62762Z"
              transform="translate(-108.5 -214.42534)"
              fill="#ffb6b6"
            />
            <path
              d="M738.442,429.68378l-17.95416-2.78264-4.2771,32.48142-23.30248,50.14458a9.05747,9.05747,0,1,0,12.48283,2.9042l24.3641-43.99508Z"
              transform="translate(-108.5 -214.42534)"
              fill="#ffb6b6"
            />
            <path
              d="M748.3914,483.79433s-15.78861,14.59976-13.78227,51.31016l4.423,56.71172-1.11542,79.0542,16.21663-1.2743,14.16753-132.48426,13.57945,54.3178L777.00548,663.787l15.62077.36246,16.413-81.77274L805.149,521.76116,798.614,483.79433Z"
              transform="translate(-108.5 -214.42534)"
              fill="#2f2e41"
            />
            <path
              d="M765.2832,398.29969l-37.7207,10.56179,19.17961,57.46536-2.86681,21.98359,58.16033.37675-13.46944-42.49112s7.55887-15.54386-1.07233-26.43922Z"
              transform="translate(-108.5 -214.42534)"
              fill="#00bfa6"
            />
            <path
              d="M760.75671,407.35265l4.52649-9.053s-.1461-2.275,10.48874-3.40075l12.47837-12.40233L799.67182,393.88l-19.30034,28.56091Z"
              transform="translate(-108.5 -214.42534)"
              fill="#00bfa6"
            />
            <path
              d="M742.65078,416.40562s-13.57945-15.08828-21.12359-7.54414-3.67612,31.53292-3.67612,31.53292l23.49744,3.64617Z"
              transform="translate(-108.5 -214.42534)"
              fill="#00bfa6"
            />
            <path
              id="a1b14455-bb06-4eca-a63d-5bd2b70c7569-173"
              data-name="Ellipse 358"
              d="M749.53844,358.40725c23.12612.10379,23.12416,35.26635-.00107,35.36687C726.41232,393.67039,726.41428,358.50784,749.53844,358.40725Z"
              transform="translate(-108.5 -214.42534)"
              fill="#ffb6b6"
            />
            <path
              d="M752.113,374.92191c3.126,1.84087,6.37424,3.72373,9.98043,4.11848s7.689-1.12309,9.136-4.44975a10.26508,10.26508,0,0,0,.70839-3.61586,24.03592,24.03592,0,0,0-6.08434-17.22366,21.79692,21.79692,0,0,0-16.72681-7.07224c-5.9754.25974-11.49727,3.08834-16.79966,5.85557-4.87614,2.54478-10.02467,5.34876-12.67408,10.16885-3.926,7.14249-1.06425,15.88722-.30173,24.00181a45.21724,45.21724,0,0,1-10.901,33.63173l32.90369,3.11769c4.00428.37941,8.08765.75446,12.01315-.12229a19.20142,19.20142,0,0,0,9.1318-32.57243c-4.67044-4.49641-12.18133-7.6797-12.36582-14.16019"
              transform="translate(-108.5 -214.42534)"
              fill="#2f2e41"
            />
            <polygon
              points="888.827 462.055 880.097 462.055 875.944 428.383 888.828 428.383 888.827 462.055"
              fill="#9f616a"
            />
            <path
              d="M999.55315,684.94245l-28.14825-.001v-.356A10.95667,10.95667,0,0,1,982.361,673.62947h.0007l17.192.00069Z"
              transform="translate(-108.5 -214.42534)"
              fill="#2f2e41"
            />
            <polygon
              points="970.002 462.055 961.272 462.055 957.119 428.383 970.003 428.383 970.002 462.055"
              fill="#9f616a"
            />
            <path
              d="M1080.72792,684.94245l-28.14825-.001v-.356a10.95667,10.95667,0,0,1,10.95608-10.95591h.0007l17.192.00069Z"
              transform="translate(-108.5 -214.42534)"
              fill="#2f2e41"
            />
            <path
              d="M993.84742,505.60392s-7.32751,19.8889-6.28072,28.26316-7.32746,66.99421-6.28071,72.22813-1.0468,31.40354,0,35.59067-2.93793,9.18843-.84438,13.37556,5.03151,12.79405,5.03151,12.79405l13.60818-1.04679,2.09359-11.51464s6.28071-1.04679,5.23392-7.32751,5.23392-48.15206,5.23392-48.15206l17.79532-58.6199,25.12282,53.386s1.04679,37.68421,4.18713,41.87134-3.14034,15.70177,0,19.8889,6.28071,11.51464,6.28071,11.51464h15.70177v-8.37426s9.42106-5.23392,0-20.93569l-6.36594-94.2958-6.28072-42.91814Z"
              transform="translate(-108.5 -214.42534)"
              fill="#2f2e41"
            />
            <circle cx="924.36975" cy="140.00413" r="19.55136" fill="#a0616a" />
            <path
              d="M1016.23191,353.08077q2.06936,5.28722,4.13883,10.5744c1.696,4.33325,3.6385,8.96929,7.61408,11.3876,4.90847,2.98581,11.46337,1.52993,16.21172-1.70446a25.31562,25.31562,0,0,0-11.39473-46.07674l-.19649,3.53926-4.343-3.64038a4.22224,4.22224,0,0,1-6.56332.92819c1.14087,2.36482-.17584,5.249-2.07727,7.06059-2.33607,2.22542-9.01748,4.9-8.74022,8.87835C1011.06648,346.68244,1015.155,350.32949,1016.23191,353.08077Z"
              transform="translate(-108.5 -214.42534)"
              fill="#2f2e41"
            />
            <path
              d="M1086.688,534.52514a8.27853,8.27853,0,0,0-3.54744-12.18834l.39066-18.91376-11.43594-3.04073L1071.91871,527.1a8.32337,8.32337,0,0,0,14.76927,7.42518Z"
              transform="translate(-108.5 -214.42534)"
              fill="#9f616a"
            />
            <path
              d="M1047.39329,386.06448s-15.15073-7.57537-29.45976-2.52513-21.88444,10.94222-21.88444,10.94222l9.25877,48.81905-12.62558,65.6532s64.81153-5.05026,70.70344,0,5.892-5.892,5.892-5.892l-5.05025-62.28637,9.25881-39.56026Z"
              transform="translate(-108.5 -214.42534)"
              fill="#3f3d56"
            />
            <path
              d="M983.44737,535.64513a8.27849,8.27849,0,0,0,.01722-12.69408l5.68516-18.04334-10.12225-6.12916L971.35683,524.372a8.32336,8.32336,0,0,0,12.09054,11.27313Z"
              transform="translate(-108.5 -214.42534)"
              fill="#9f616a"
            />
            <path
              d="M1001.94105,394.48157h-5.892s-9.25879,5.892-9.25879,14.309S973.323,515.68753,973.323,515.68753l14.309,2.52511,12.62563-69.02006,9.25881-18.51759Z"
              transform="translate(-108.5 -214.42534)"
              fill="#3f3d56"
            />
            <path
              d="M1057.49381,401.21523h15.99243s5.05026,5.05024,7.57537,16.83416,5.05026,58.07784,5.05026,58.07784l-1.68341,42.08541h-12.62562l-1.68341-54.711-8.41707-35.35172Z"
              transform="translate(-108.5 -214.42534)"
              fill="#3f3d56"
            />
            <path
              d="M316.18119,457.22863a8.53286,8.53286,0,0,0-1.15923.67925L277.58039,443.2721l-1.48413-9.65273-14.86043.33578.96668,17.3436a6.48483,6.48483,0,0,0,5.00932,5.95619l44.55241,10.33545a8.509,8.509,0,1,0,4.417-10.36176Z"
              transform="translate(-108.5 -214.42534)"
              fill="#9f616a"
            />
            <polygon
              points="151.465 460.884 161.403 460.883 166.13 422.552 151.463 422.552 151.465 460.884"
              fill="#9f616a"
            />
            <path
              d="M257.42988,672.06462l19.57125-.00079h.00079A12.473,12.473,0,0,1,289.47425,684.536v.4053l-32.04378.00119Z"
              transform="translate(-108.5 -214.42534)"
              fill="#2f2e41"
            />
            <polygon
              points="103.639 460.884 113.577 460.883 118.305 422.552 103.638 422.552 103.639 460.884"
              fill="#9f616a"
            />
            <path
              d="M209.60426,672.06462l19.57125-.00079h.00079A12.473,12.473,0,0,1,241.64864,684.536v.4053l-32.04379.00119Z"
              transform="translate(-108.5 -214.42534)"
              fill="#2f2e41"
            />
            <path
              d="M217.90176,383.05916c-2.83025-11.68591-5.22808-24.86639.10954-35.62928,3.7035-7.46782,17.40408-9.98265,25.25786-7.29228s13.53208,9.98951,16.0294,17.94787,2.20712,16.53411,1.11869,24.80737C245.97309,382.61537,231.52893,382.3379,217.90176,383.05916Z"
              transform="translate(-108.5 -214.42534)"
              fill="#2f2e41"
            />
            <circle cx="133.77668" cy="151.78726" r="16.84339" fill="#9f616a" />
            <path
              d="M221.6858,362.743a21.15589,21.15589,0,1,1,42.28634.55745C249.55546,363.331,235.13879,363.36162,221.6858,362.743Z"
              transform="translate(-108.5 -214.42534)"
              fill="#2f2e41"
            />
            <path
              d="M228.29805,445.1968l-7.04423,11.74038s-19.29152,36.18176-18.14422,66.173l4.26923,37.35575-4.68525,9.16706,3.13614,16.1287-5.82425,11.55366,10.52845,55.7784.448,12.09652h17.02473l-.896-12.32053,7.16831-54.33951,12.09652-58.01849,6.27227,50.08333-2.2401,12.54453,2.91213,10.52846,4.03217,32.48139.448,15.68067,15.45666,1.79208,5.82425-58.01849,3.36014-27.68236L264.4333,455.18126Z"
              transform="translate(-108.5 -214.42534)"
              fill="#2f2e41"
            />
            <path
              d="M226.06378,388.50877l-10.48725,4.454-5.88994,24.37666,12.40157,31.76011-4.63623,15.8688c14.034,24.00629,31.40456,27.49423,51.845,12.09921-4.32612-12.14611-3.70115-24.63537.60994-37.38009,0,0,10.75274-10.01276,3.24134-23.03041l-7.165-19.44791-8.871-4.43549Z"
              transform="translate(-108.5 -214.42534)"
              fill="#cbcbcb"
            />
            <path
              d="M263.91705,401.44877l2.38073-4.42135s6.27853.9443,8.8427,8.5026,3.231,38.09165,3.231,38.09165l-13.43411.68021Z"
              transform="translate(-108.5 -214.42534)"
              fill="#cbcbcb"
            />
            <path
              d="M591.9213,401.091,192.7024,503.97714a3.82764,3.82764,0,0,1-1.91047-7.413L590.01083,393.678a3.82763,3.82763,0,1,1,1.91047,7.413Z"
              transform="translate(-108.5 -214.42534)"
              fill="#00bfa6"
            />
            <path
              d="M211.28865,505.08079a8.70806,8.70806,0,0,0,3.114-12.98459l6.51155-63.66486H206.84205l-5.17489,62.16546a8.75525,8.75525,0,0,0,9.62149,14.484Z"
              transform="translate(-108.5 -214.42534)"
              fill="#9f616a"
            />
            <path
              d="M224.147,400.16317l-4.93151-6.97213s-8.67265-5.87968-13.094,7.65234-3.74114,38.60181-3.74114,38.60181l16.83515,6.97213Z"
              transform="translate(-108.5 -214.42534)"
              fill="#cbcbcb"
            />
            <path
              d="M490.5,685.57466h-381a1,1,0,0,1,0-2h381a1,1,0,0,1,0,2Z"
              transform="translate(-108.5 -214.42534)"
              fill="#cacaca"
            />
            <path
              d="M1090.5,685.57466h-381a1,1,0,0,1,0-2h381a1,1,0,0,1,0,2Z"
              transform="translate(-108.5 -214.42534)"
              fill="#cacaca"
            />
          </svg>
        </div>
      </section>
      <section className="py-8" id="explore">
        <h2 className="pb-4 text-2xl font-semibold">Explore Recent Posts</h2>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
            {posts.map((post) => {
              return <PostItem key={post.id} post={post} />;
            })}
          </div>
        ) : (
          <p className="py-8 text-center text-2xl">No posts found.</p>
        )}
      </section>
    </div>
  );
}

async function title() {
  const title = await axios.get(
    "https://baconipsum.com/api/?type=all-meat&sentences=1"
  );
  return title.data[0] || "API routes in NextJS 13 - App router ";
}

async function content() {
  const content = await axios.get("https://baconipsum.com/api/?type=meat");
  return content.data[0] || "API routes in NextJS 13 - App router ";
}

async function addPost() {
  const postTitle = await title();
  const postContent = await content();

  if (!postTitle || !postContent) {
    throw "Could not add post.";
  }
  try {
    const post = await axios.post("/api/post", {
      title: postTitle,
      content: JSON.stringify({ ops: [{ insert: postContent }] }),
      slug: "random-post-" + Math.round(Math.random() * Math.random() * 1000),
      featured_image: `https://nextjs.org/api/og?title=${postTitle
        .split()
        .splice(0, 5)
        .join(" ")}`,
      status: "public",
    });
    console.log("Added Post ", post);
    return post;
  } catch (error) {
    console.log("Could not add post");
    return null;
  }
}
