import { fetchMock } from "@/lib/api";
import {
  PTable,
  PTableHead,
  PTableHeaderCell,
  PTableBody,
  PTableRow,
  PTableCell,
} from "@/components/ui";
import { PBadge } from "@/components/ui";

export default async function MembersPage() {
  const members = await fetchMock<
    {
      id: string;
      name: string;
      dojo: string;
      rank: string;
      province: string;
      verified: boolean;
    }[]
  >("members");

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-heritage">Data Anggota</h1>
      <PTable>
        <PTableHead>
          <tr>
            <PTableHeaderCell>Nama</PTableHeaderCell>
            <PTableHeaderCell>Perguruan</PTableHeaderCell>
            <PTableHeaderCell>Sabuk</PTableHeaderCell>
            <PTableHeaderCell>Provinsi</PTableHeaderCell>
            <PTableHeaderCell>Status</PTableHeaderCell>
          </tr>
        </PTableHead>
        <PTableBody>
          {members.map((member) => (
            <PTableRow key={member.id}>
              <PTableCell>{member.name}</PTableCell>
              <PTableCell>{member.dojo}</PTableCell>
              <PTableCell>{member.rank}</PTableCell>
              <PTableCell>{member.province}</PTableCell>
              <PTableCell>
                <PBadge variant={member.verified ? "gold" : "outline"}>
                  {member.verified ? "Terverifikasi" : "Menunggu"}
                </PBadge>
              </PTableCell>
            </PTableRow>
          ))}
        </PTableBody>
      </PTable>
    </div>
  );
}
