import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Stack, Link,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PublicIcon from "@mui/icons-material/Public";
import FacebookIcon from "@mui/icons-material/Facebook";

export default function Gioithieuchung() {
  const links = [
    {
      title: "Thư viện trung tâm Đại học Quốc gia TP. HCM",
      url: "http://www.vnulib.edu.vn/",
    },
    {
      title: "Mạng Thông tin và Khoa học Công nghệ TP. HCM",
      url: "http://stinet.gov.vn/",
    },
    {
      title: "Trung tâm học liệu Đại học Cần Thơ",
      url: "https://lrc.ctu.edu.vn/",
    },
    {
      title: "Thư viện Quốc gia Hàn Quốc",
      url: "https://nl.go.kr/EN/main/index.do",
    },
    {
      title: "Trung tâm tri thức số (NALA)",
      url: "http://digitalknowledgehub.nala.edu.vn",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        px: { xs: 2, md: 4 },
        py: 4,
        maxWidth: 1400,
        mx: "auto",
        flexDirection: { xs: "column", md: "row" },
        mt: { xs: 6, md: 10 }
      }}
    >
      {/* LEFT CONTENT */}
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          p: { xs: 2, md: 3 },
          borderRadius: 1,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h7" sx={{ fontWeight: 800, mb: 2 }}>
          GIỚI THIỆU CHUNG
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, textAlign: "center" }}>
          TỔNG QUAN VỀ THƯ VIỆN
        </Typography>

        <Typography sx={{ mb: 1 }}>
          - Thư viện Trường Đại học Sư phạm TP. Hồ Chí Minh được thành lập năm
          1976 trên cơ sở tiếp quản Thư viện Đại học Vạn Hạnh và Thư viện
          trường Đại học Sư phạm Sài Gòn.
        </Typography>

        <Typography sx={{ mb: 1 }}>
          - Hiện nay, Thư viện hoạt động tại: Tòa nhà Thư viện — Nhà làm việc
          Giáo sư, lầu 1 – 7, số 280 An Dương Vương, Phường 4, Quận 5, TP. Hồ
          Chí Minh.
        </Typography>

        <Typography sx={{ mb: 2 }}>Bao gồm:</Typography>

        <Typography sx={{ mb: 1 }}>- Lầu 1: Quầy hướng dẫn thông tin, khu trưng bày, triển lãm…</Typography>
        <Typography sx={{ mb: 1 }}>- Lầu 2: Phòng đọc / Kho sách Tiếng Việt…</Typography>
        <Typography sx={{ mb: 1 }}>- Lầu 3: Phòng đọc / Kho sách Tiếng Việt (Phục vụ đọc tại chỗ và mượn về).</Typography>
        <Typography sx={{ mb: 1 }}>- Lầu 4: Phòng đọc / kho sách Ngoại văn…</Typography>
        <Typography sx={{ mb: 1 }}>- Lầu 5: Không gian văn hóa…</Typography>
        <Typography sx={{ mb: 1 }}>- Lầu 6: Khu vực phòng học nhóm.</Typography>
        <Typography sx={{ mb: 3 }}>- Lầu 7: Khu vực các phòng chức năng.</Typography>

        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          1. Đội ngũ nhân sự:
        </Typography>

        <Typography sx={{ mb: 3 }}>
          Thư viện có 19 viên chức, người lao động. Trong đó, 16 viên chức
          trong biên chế và 03 hợp đồng lao động khoán việc.
        </Typography>

        {/* TABLE */}
        <Paper elevation={1} sx={{ maxWidth: "100%", mb: 4, borderRadius: 0 }}>
          <Table>
            <TableHead>
              {/* ======= FIRST HEADER ROW ======= */}
              <TableRow>
                <TableCell
                  rowSpan={2}
                  align="center"
                  sx={{ fontWeight: 700, border: "1px solid #999" }}
                >
                  Trình độ
                </TableCell>

                <TableCell
                  colSpan={3}
                  align="center"
                  sx={{ fontWeight: 700, border: "1px solid #999" }}
                >
                  Trình độ chuyên môn
                </TableCell>

                <TableCell
                  colSpan={2}
                  align="center"
                  sx={{ fontWeight: 700, border: "1px solid #999" }}
                >
                  Giới tính
                </TableCell>

                <TableCell
                  colSpan={2}
                  align="center"
                  sx={{ fontWeight: 700, border: "1px solid #999" }}
                >
                  Độ tuổi
                </TableCell>
              </TableRow>

              {/* ======= SECOND HEADER ROW ======= */}
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 700, border: "1px solid #999" }}>
                  TV-TT
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, border: "1px solid #999" }}>
                  CNTT
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, border: "1px solid #999" }}>
                  Khác
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, border: "1px solid #999" }}>
                  Nam
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, border: "1px solid #999" }}>
                  Nữ
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, border: "1px solid #999" }}>
                  Dưới 40
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, border: "1px solid #999" }}>
                  Trên 40
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>Sau đại học</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>0</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>0</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>0</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>3</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>2</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>2</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>3</TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>Đại học</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>9</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>1</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>1</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>6</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>5</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>4</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>7</TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontWeight: 700, border: "1px solid #999" }}>Tổng</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>12</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>1</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>1</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>9</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>7</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>6</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>10</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>

        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          2. Nguồn tài nguyên thông tin:
        </Typography>
        <Typography sx={{ mb: 1 }}>
          Hiện nay, nguồn tài liệu được tổ chức tại 02 cơ sở (Cơ sở 222 Lê Văn Sỹ và Cơ sở 280 An Dương Vương):
        </Typography>
        <Typography sx={{ mb: 1 }}>- Cơ sở 222 Lê Văn Sỹ: Tổ chức các kho tài liệu có năm xuất bản trước năm 1975 và những tài liệu nhiều bản, chủ yếu làm kho lưu trữ. Tuy nhiên, trường hợp bạn đọc có nhu cầu, đăng ký mượn, Thư viện sẽ chuyển về cơ sở 280 An Dương Vương để phục vụ bạn đọc.</Typography>
        <Typography sx={{ mb: 1 }}>- Cơ sở 280 An Dương Vương: Tổ chức các kho tài liệu có tần suất sử dụng cao, tài liệu mới, có năm xuất bản gần đây.</Typography>
        <Typography variant="h7" sx={{ fontWeight: 700, mb: 3 }}>
          2.1. Tài liệu truyền thống tại cơ sở 222 Lê Văn Sỹ:
        </Typography>

        <Paper elevation={1} sx={{ maxWidth: "100%", mb: 4, borderRadius: 0 }}>
          <Table sx={{ border: "1px solid #999" }}>
            <TableHead>
              {/* ===== ROW 1 ===== */}
              <TableRow>
                <TableCell
                  rowSpan={2}
                  align="center"
                  sx={{ fontWeight: 700, border: "1px solid #999" }}
                >
                  STT
                </TableCell>

                <TableCell
                  rowSpan={2}
                  align="center"
                  sx={{ fontWeight: 700, border: "1px solid #999", minWidth: 250 }}
                >
                  Loại hình tài liệu
                </TableCell>

                <TableCell
                  colSpan={2}
                  align="center"
                  sx={{ fontWeight: 700, border: "1px solid #999" }}
                >
                  Số lượng
                </TableCell>
              </TableRow>

              {/* ===== ROW 2 (SUB HEADER) ===== */}
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 700, border: "1px solid #999" }}
                >
                  Nhan đề
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ fontWeight: 700, border: "1px solid #999" }}
                >
                  Quyển
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* ===== ROW 1 ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>1</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Sách tiếng Việt</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>40.318</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>92.195</TableCell>
              </TableRow>

              {/* ===== ROW 2 ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>2</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Sách ngoại văn</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>7.918</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>9.815</TableCell>
              </TableRow>

              {/* ===== ROW 3 (TWO LINE TEXT) ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>3</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>
                  Luận văn, luận án;
                  <br />
                  Đề tài nghiên cứu khoa học
                </TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>7.681</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>8.500</TableCell>
              </TableRow>

              {/* ===== ROW 4 ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>4</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Từ điển, bách khoa thư</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>2.279</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>3.259</TableCell>
              </TableRow>

              {/* ===== ROW 5 ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>5</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>CD-ROM</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>2.224</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>4.232</TableCell>
              </TableRow>

              {/* ===== ROW 6 ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>6</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Tạp chí</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>475</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>5.073</TableCell>
              </TableRow>

              {/* ===== ROW 7 ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>7</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Kỷ yếu hội thảo</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>352</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>540</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>

        <Typography variant="h7" sx={{ fontWeight: 800, mb: 3 }}>
          2.2. Tài liệu truyền thống tại cơ sở 280 An Dương Vương:
        </Typography>

        <Paper elevation={1} sx={{ maxWidth: "100%", mb: 4, borderRadius: 0 }}>
          <Table sx={{ border: "1px solid #999" }}>
            <TableHead>
              {/* ===== ROW 1 ===== */}
              <TableRow>
                <TableCell
                  rowSpan={2}
                  align="center"
                  sx={{ fontWeight: 700, border: "1px solid #999" }}
                >
                  STT
                </TableCell>

                <TableCell
                  rowSpan={2}
                  align="center"
                  sx={{ fontWeight: 700, border: "1px solid #999", minWidth: 250 }}
                >
                  Kho tài liệu
                </TableCell>

                <TableCell
                  colSpan={2}
                  align="center"
                  sx={{ fontWeight: 700, border: "1px solid #999" }}
                >
                  Số lượng
                </TableCell>
              </TableRow>

              {/* ===== ROW 2 (SUB HEADER) ===== */}
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 700, border: "1px solid #999" }}
                >
                  Nhan đề
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ fontWeight: 700, border: "1px solid #999" }}
                >
                  Quyển
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* ===== ROW 1 ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>1</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Sách tiếng Việt (Lầu 2)</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>15.244</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>24.444</TableCell>
              </TableRow>

              {/* ===== ROW 2 ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>2</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Sách tiếng Việt (Lầu 3)</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>10.473</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>18.232</TableCell>
              </TableRow>

              {/* ===== ROW 3 (TWO LINE TEXT) ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>3</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Sách Ngoại văn (Lầu 4)</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>4.624</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>5.728</TableCell>
              </TableRow>

              {/* ===== ROW 4 ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>4</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Luận văn, luận án, đề tài nghiên cứu khoa học (Lầu 4)</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>3.460</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>3.561</TableCell>
              </TableRow>

              {/* ===== ROW 5 ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>5</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Từ điển (Lầu 4)</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>617</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>889</TableCell>
              </TableRow>

              {/* ===== ROW 6 ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>6</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Tạp chí khoa học</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>171</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>1.870</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>

        <Typography variant="h7" sx={{ fontWeight: 800, mb: 3 }}>
          2.3. Tài liệu số:
        </Typography>

        <Paper elevation={1} sx={{ maxWidth: "100%", mb: 4, borderRadius: 0 }}>
          <Table sx={{ border: "1px solid #999" }}>
            <TableHead>
              {/* ===== ROW 1 ===== */}
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 700, border: "1px solid #999" }}
                >
                  STT
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ fontWeight: 700, border: "1px solid #999", minWidth: 250 }}
                >
                  Loại tài liệu
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ fontWeight: 700, border: "1px solid #999" }}
                >
                  Số lượng
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* ===== ROW 1 ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>1</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Bài báo khoa học</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>439</TableCell>
              </TableRow>

              {/* ===== ROW 2 ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>2</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Báo cáo khoa học</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>894</TableCell>
              </TableRow>

              {/* ===== ROW 3 (TWO LINE TEXT) ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>3</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Khóa luận tốt nghiệp</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>3.665</TableCell>
              </TableRow>

              {/* ===== ROW 4 ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>4</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Luận án Tiến sĩ</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>255</TableCell>
              </TableRow>

              {/* ===== ROW 5 ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>5</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Luận văn Thạc sĩ</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>5.625</TableCell>
              </TableRow>

              {/* ===== ROW 6 ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>6</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Giáo trình</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>101</TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>7</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Sách điện tử Science E-resource</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>23</TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>8</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Tủ sách các khoa</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>250</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>

        <Typography variant="h7" sx={{ fontWeight: 800, mb: 3 }}>
          2.4. Cơ sở dữ liệu điện tử:
        </Typography>

        <Paper elevation={1} sx={{ maxWidth: "100%", mb: 4, borderRadius: 0 }}>
          <Table sx={{ border: "1px solid #999" }}>
            <TableHead>
              {/* ===== ROW 1 ===== */}
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 700, border: "1px solid #999" }}
                >
                  STT
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ fontWeight: 700, border: "1px solid #999", minWidth: 250 }}
                >
                  Tên cơ sở dữ liệu
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ fontWeight: 700, border: "1px solid #999" }}
                >
                  Số lượng
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* ===== ROW 1 ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>1</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Tạp chí NXB Springer</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>987 tạp chí (xuất bản từ 10/2020 – 12/2022)</TableCell>
              </TableRow>

              {/* ===== ROW 2 ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>2</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Tạp chí NXB Cambridge</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>408 tạp chí (xuất bản từ 10/2020 – 12/2022)</TableCell>
              </TableRow>

              {/* ===== ROW 3 (TWO LINE TEXT) ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>3</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Sách điện tử tổng hợp (NXB iG Publishing)</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>158 tài liệu có thời gian xuất bản từ 2010 - 2019</TableCell>
              </TableRow>

              {/* ===== ROW 4 ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>4</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Sách điện tử ACS Publications</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>1.401 tài liệu có thời gian xuất bản trước 2022</TableCell>
              </TableRow>

              {/* ===== ROW 5 ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>5</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Sách điện tử ProQuest Ebook Central</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>243.202 tài liệu</TableCell>
              </TableRow>

              {/* ===== ROW 6 ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>6</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Cục thông tin Khoa học và Công nghệ Quốc gia</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>CSDL tạp chí Proquest và nguồn tài liệu công bố khoa học của Việt Nam</TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>7</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Sách điện tử Science E-Resources</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Bao gồm 20 sách điện tử về lĩnh vực khoa học vật lý và kỹ thuật.</TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </Paper>

        <Typography variant="h7" sx={{ fontWeight: 800, mb: 3 }}>
          2.5. Dữ liệu liên kết:
        </Typography>

        <Stack spacing={2} sx={{ mb: 3 }}>
          {links.map((item, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: 1.5,
                borderRadius: 1.5,
                border: "1px solid #ddd",
                transition: "0.2s",
                "&:hover": {
                  backgroundColor: "#f5faff",
                  borderColor: "#0b3d91",
                },
              }}
            >
              <LanguageIcon sx={{ color: "#0b3d91", fontSize: 26 }} />

              <Box>
                <Typography sx={{ fontWeight: 600 }}>{item.title}</Typography>

                <Link
                  href={item.url}
                  target="_blank"
                  underline="hover"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: "#0066cc",
                    fontSize: 14,
                  }}
                >
                  <ArrowRightIcon sx={{ fontSize: 16 }} />
                  {item.url}
                </Link>
              </Box>
            </Box>
          ))}
        </Stack>

        <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>
          3. Cơ sở vật chất:
        </Typography>

        <Paper elevation={1} sx={{ maxWidth: "100%", mb: 4, borderRadius: 0 }}>
          <Table sx={{ border: "1px solid #999" }}>
            <TableHead>
              {/* ===== ROW 1 ===== */}
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 700, border: "1px solid #999" }}
                >
                  STT
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ fontWeight: 700, border: "1px solid #999", minWidth: 250 }}
                >
                  Không gian thư viện
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ fontWeight: 700, border: "1px solid #999" }}
                >
                  Cơ sở vật chất
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* ===== ROW 1 ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>1</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>
                  <Typography sx={{ fontWeight: 700, textAlign: "center" }}>Lầu 1:</Typography>
                  Quầy hướng dẫn thông tin, khu vực trưng bày, triển lãm, trao đổi sách và khu vực gửi túi xách
                </TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>
                  <Typography>- Hệ thống cổng RFID</Typography>
                  <Typography>- Không gian trưng bày, triển lãm</Typography>
                  <Typography>- Số chỗ ngồi: 53</Typography>
                  <Typography>- Khu vực gửi túi xách</Typography>
                  <Typography>- Máy nước uống: 01</Typography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>1</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>
                  <Typography sx={{ fontWeight: 700, textAlign: "center" }}>Lầu 2:</Typography>
                  Phòng đọc/ Kho sách Tiếng Việt (phục vụ đọc tại chỗ)
                </TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>
                  <Typography>- Số lượng sách: 15.244 nhan đề / 24.444 cuốn</Typography>
                  <Typography>- Số chỗ ngồi: 110</Typography>
                  <Typography>- Máy tính tra cứu: 24</Typography>
                  <Typography>- Máy selfcheck: 01 máy</Typography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>1</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>
                  <Typography sx={{ fontWeight: 700, textAlign: "center" }}>Lầu 3:</Typography>
                  Phòng đọc/ Kho sách Tiếng Việt (phục vụ đọc tại chỗ và mượn về)
                </TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>
                  <Typography>- Số lượng sách: 10.473 nhan đề / 18.232 cuốn</Typography>
                  <Typography>- Số chỗ ngồi: 140</Typography>
                  <Typography>- Máy tính: 01</Typography>
                  <Typography>- Máy selfcheck: 01 máy</Typography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>1</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>
                  <Typography sx={{ fontWeight: 700, textAlign: "center" }}>Lầu 4:</Typography>
                  Phòng đọc/ Kho sách Ngoại văn, Luận văn, Luận án, Từ điển và Tạp chí khoa học
                </TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>
                  <Typography>- Sách Ngoại văn: 4.624 cuốn / 5.728 cuốn</Typography>
                  <Typography>- Từ điển, Bách khoa thư: 617 nhan đề / 889 cuốn</Typography>
                  <Typography>- Luận văn, luận án, báo cáo kết quả NCKH: 2.669 nhan đề / 2.688 cuốn</Typography>
                  <Typography>- Tạp chí khoa học: 171 nhan đề / 1870 cuốn</Typography>
                  <Typography>- Số chỗ ngồi: 110</Typography>
                  <Typography>- Máy tính: 01</Typography>
                  <Typography>- Máy selfcheck: 01 máy</Typography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>1</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>
                  <Typography sx={{ fontWeight: 700, textAlign: "center" }}>Lầu 5:</Typography>
                  Không gian văn hóa các nước/ Khu tự học
                </TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>
                  <Typography>- Số chỗ ngồi: 165</Typography>
                  <Typography>- Máy nước uống</Typography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>1</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>
                  <Typography sx={{ fontWeight: 700, textAlign: "center" }}>Lầu 6:</Typography>
                  Khu vực học nhóm
                </TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>
                  <Typography>- Số lượng: 8 phòng</Typography>
                  <Typography>- Số chỗ ngồi: 170 - 250</Typography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>1</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>
                  <Typography sx={{ fontWeight: 700, textAlign: "center" }}>Lầu 7:</Typography>
                  Văn phòng thư viện
                </TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>
                  <Typography>- Phòng Giám đốc</Typography>
                  <Typography>- Phòng họp chung</Typography>
                  <Typography>- Phòng Xử lý nghiệp vụ</Typography>
                  <Typography>- Phòng Bổ sung tài liệu</Typography>
                  <Typography>- Phòng Dịch vụ, hỗ trợ bạn đọc</Typography>
                  <Typography>- Kho Lưu trữ</Typography>
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </Paper>

        <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>
          4. Đối tượng phục vụ:
        </Typography>
        <Typography sx={{ mb: 1 }}>
          Hiện nay, Thư viện phục vụ các nhóm đối tượng bạn đọc như sau:
        </Typography>

        <Paper elevation={1} sx={{ maxWidth: "100%", mb: 4, borderRadius: 0 }}>
          <Table sx={{ border: "1px solid #999" }}>
            <TableHead>
              {/* ===== ROW 1 ===== */}
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 700, border: "1px solid #999" }}
                >
                  STT
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ fontWeight: 700, border: "1px solid #999", minWidth: 250 }}
                >
                  Đối tượng phục vụ
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ fontWeight: 700, border: "1px solid #999" }}
                >
                  Số lượng
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* ===== ROW 1 ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>1</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Cán bộ quản lý, giảng viên, chuyên viên</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>829</TableCell>
              </TableRow>

              {/* ===== ROW 2 ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>2</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Sinh viên</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>18.413</TableCell>
              </TableRow>

              {/* ===== ROW 3 (TWO LINE TEXT) ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>3</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Học viên cao học, Nghiên cứu sinh</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>1.469</TableCell>
              </TableRow>

              {/* ===== ROW 4 ===== */}
              <TableRow>
                <TableCell sx={{ border: "1px solid #999" }}>4</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>Học sinh Trường trung học thực hành</TableCell>
                <TableCell sx={{ border: "1px solid #999" }}>440</TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2} align="center" sx={{ fontWeight: 800, border: "1px solid #999" }}>
                  Tổng số bạn đọc
                </TableCell>
                <TableCell sx={{ fontWeight: 800, border: "1px solid #999" }}>
                  21.151
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </Paper>

        <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>
          5. Các kênh liên hệ và trao đổi thông tin:
        </Typography>

        <Stack direction="row" spacing={2} alignItems="flex-start">
          <LocationOnIcon color="primary" />
          <Typography>
            Tòa nhà Thư viện – Nhà làm việc Giáo sư, lầu 1 – 7 <br />
            Số 280 An Dương Vương, Phường 4, Quận 5, TP. HCM.
          </Typography>
        </Stack>

        {/* Phone: Giám đốc */}
        <Stack direction="row" spacing={2} alignItems="center" mt={2}>
          <PhoneIcon color="primary" />
          <Typography>
            <b>Phòng Giám đốc:</b> (028) 35261042
          </Typography>
        </Stack>

        {/* Phone: Bộ phận nghiệp vụ */}
        <Stack direction="row" spacing={2} alignItems="center">
          <PhoneIcon color="primary" />
          <Typography>
            <b>Bộ phận Bổ sung, xử lý nghiệp vụ:</b> (028) 38352020 – Ext: 233
          </Typography>
        </Stack>

        {/* Phone: Dịch vụ / Tư vấn */}
        <Stack direction="row" spacing={2} alignItems="center">
          <PhoneIcon color="primary" />
          <Typography>
            <b>Dịch vụ - Thông tin / Tư vấn thông tin:</b> (028) 38352020 – Ext: 231
          </Typography>
        </Stack>

        {/* Phone: Mượn trả */}
        <Stack direction="row" spacing={2} alignItems="center">
          <PhoneIcon color="primary" />
          <Typography>
            <b>Dịch vụ - Thông tin / Mượn trả, gia hạn tài liệu:</b>{" "}
            (028) 38352020 – Ext: 232
          </Typography>
        </Stack>

        {/* Phone: Quản lý tài khoản */}
        <Stack direction="row" spacing={2} alignItems="center">
          <PhoneIcon color="primary" />
          <Typography>
            <b>Dịch vụ - Thông tin / Quản lý tài khoản thư viện, phục vụ online:</b>{" "}
            (028) 38352020 – Ext: 234
          </Typography>
        </Stack>

        {/* Email */}
        <Stack direction="row" spacing={2} alignItems="center" mt={2}>
          <EmailIcon color="primary" />
          <Link href="mailto:thuvien@hcmue.edu.vn" underline="hover">
            thuvien@hcmue.edu.vn
          </Link>
        </Stack>

        {/* Website */}
        <Stack direction="row" spacing={2} alignItems="center">
          <PublicIcon color="primary" />
          <Link href="https://lib.hcmue.edu.vn" underline="hover" target="_blank">
            lib.hcmue.edu.vn
          </Link>
        </Stack>

        {/* Facebook */}
        <Stack direction="row" spacing={2} alignItems="center">
          <FacebookIcon color="primary" />
          <Link
            href="https://www.facebook.com/lib.hcmue.edu.vn"
            underline="hover"
            target="_blank"
          >
            facebook.com/lib.hcmue.edu.vn
          </Link>
        </Stack>

      </Paper>

      {/* RIGHT SIDEBAR (STICKY) */}
      <Box
        sx={{
          width: 260,
          position: "sticky",
          top: 90,
          alignSelf: "flex-start",
        }}
      >
        <Paper elevation={3} sx={{ p: 2, borderRadius: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
            GIỚI THIỆU
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <List>
            <ListItemButton selected>
              <ListItemText primary="Giới thiệu chung" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Chức năng nhiệm vụ" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Cơ cấu tổ chức" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Nội quy thư viện" />
            </ListItemButton>
          </List>
        </Paper>
      </Box>
    </Box>
  );
}